# pip install aiosmtpd
from ml import AIEmailGenerativeModel
from email.parser import BytesParser
import time

class SMTPHandler:

    def __init__(self, db):

        # ai model
        self.model = AIEmailGenerativeModel(service_account_file="service-accounts/ml-service-account.json")

        # db
        self.db = db

    async def handle_DATA(self, server, session, envelope):

        peer = session.peer

        parser = BytesParser()
        message = parser.parsebytes(envelope.content)
        subject = message['subject']
        sender = message['From']
        recipient = envelope.rcpt_tos[0]
        body = message.get_payload()
        current_timestamp = int(time.time())

        print(subject)
        print(sender)
        print(recipient)

        emailType = self.model.get_email_type(str(envelope.content))
        print(emailType)

        cur = self.db.cursor()
        sql = """
            INSERT INTO emails (sender, recipient, subject, content, ai_type, timestamp)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id;
        """
        cur.execute(sql, (sender, recipient, subject, body, emailType, current_timestamp))
        self.db.commit()

        return '250 OK'