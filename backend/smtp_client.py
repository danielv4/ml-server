import smtplib
from email.mime.text import MIMEText

class SmtpClient:

    def __init__(self):
        self.client = smtplib.SMTP('localhost', 25)

    def send_email(self, sender_email, receiver_email, subject, message):

        #sender_email = "your_email@yourdomain.com"
        #receiver_email = "hello@codeai.cloud"
        #message = "Hey here's my resume, is your team hiring this month"
        #subject = "Simple Email Test"

        msg = MIMEText(message)
        msg['Subject'] = subject
        msg['From'] = sender_email
        msg['To'] = receiver_email
        
        try:
            self.client.sendmail(sender_email, receiver_email, msg.as_string())
            print('Email sent successfully!')
        except Exception as e:
            print('Error sending email:', e)