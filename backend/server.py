import asyncio
import requests
import aiosmtpd.controller
from flask import Flask, request, Response, jsonify
from smtp_server import SMTPHandler
from smtp_client import SmtpClient
from flask.views import MethodView
import psycopg2
import json


app = Flask(__name__)


class MainView(MethodView):

    def send_email(self, req):

        data = req.get_json()
        sender_email = "support@codeai.cloud"
        receiver_email = data.get('receiver_email')
        subject = data.get('subject')
        message = data.get('message')

        client = SmtpClient()
        client.send_email(
            sender_email = sender_email,
            receiver_email = receiver_email,
            subject = subject,
            message = message,
        )

        return jsonify({"status":200})
    
    def list_emails(self, db, req):

        cur = db.cursor()

        cur.execute("SELECT * FROM emails ORDER BY timestamp DESC")
        rows = cur.fetchall()

        email_list = []
        for row in rows:
            email = {
                "id": row[0],
                "sender": row[1],
                "recipient": row[2],
                "subject": row[3],
                "content": row[4],
                "ai_type": row[5],
                "timestamp": row[6]
            }
            email_list.append(email)

        return jsonify({"status":200, "emails":email_list})

    def proxy(self, path):
        url = f"http://127.0.0.1:8080/{path}"
        resp = requests.get(url)
        excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
        headers = [(name, value) for (name, value) in resp.raw.headers.items() if name.lower() not in excluded_headers]
        response = Response(resp.content, resp.status_code, headers)
        return response

    def post(self, path, db):
         
        #print()
        #print(db)
        if request.path == "/api/email/send":
            return self.send_email(request)
        else:
            return jsonify({"status":200})

    def get(self, path, db):
        #print(request.path)
        #print(db)
        if request.path == "/api/email/list":
            return self.list_emails(db, request)
        else:
            return self.proxy(request.path)


async def run_http_server(loop, db):

    app.add_url_rule('/', view_func=MainView.as_view('dynamic_view'), defaults={'path': '', 'db':db})
    app.add_url_rule('/<path:path>', view_func=MainView.as_view('dynamic_view2'), defaults={'path': '', 'db':db})

    app.run(
        host='0.0.0.0',
        port=443,
        ssl_context=(
            '/etc/letsencrypt/live/codeai.cloud/fullchain.pem',
            '/etc/letsencrypt/live/codeai.cloud/privkey.pem'
        ),
        debug=False
    )


async def run_smtp_server(loop, db):
    handler = SMTPHandler(db=db)
    server = aiosmtpd.controller.Controller(handler, hostname='127.0.0.1', port=25)
    server.start()


if __name__ == '__main__':
    loop = asyncio.get_event_loop()

    # load config
    with open('configs/config.json', 'r') as file:
        
        config = json.load(file)

        # db 
        conn = None
        try:
            conn = psycopg2.connect(f"host='{config['db_host']}' dbname='{config['db_name']}' user='{config['db_user']}' password='{config['db_password']}'")
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

        loop.create_task(run_smtp_server(loop=loop, db=conn))
        loop.create_task(run_http_server(loop=loop, db=conn))
        try:
            loop.run_forever()
        except KeyboardInterrupt:
            pass