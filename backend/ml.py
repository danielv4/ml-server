import vertexai
import re
from google.oauth2 import service_account
from vertexai.generative_models import GenerationConfig, GenerativeModel

class AIEmailGenerativeModel:
    def __init__(self, service_account_file):
        self.credentials = service_account.Credentials.from_service_account_file(service_account_file)

        vertexai.init(project="codeai-cloud", location="us-central1", credentials=self.credentials)

        self.model = GenerativeModel(
            "gemini-1.5-flash-002",
            system_instruction=[
                "You output email classification id numbers",
                "1: job seekers",
                "2: sales calls",
                "3: customer complaints",
                "4: business proposals",
                "5: none of the above",
            ],
        )

        self.response_schema = {"type": "STRING"}

    def get_email_type(self, content):
        response = self.model.generate_content(
            content,
            generation_config=GenerationConfig(
                response_mime_type="application/json", response_schema=self.response_schema
            ),
        )

        output = response.text
        output = re.sub(r'\D', '', output)
        return output