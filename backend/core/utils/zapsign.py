from dotenv import load_dotenv
import os
import requests

class ZapSign:
    def __init__(self):
        load_dotenv()
        self.api_url = str(os.environ.get('ZAPSIGN_API_URL'))
        self.api_token = str(os.environ.get('ZAPSIGN_API_TOKEN'))
    
    def create_document(self, name, url_pdf, signer_name, signer_email):
        endpoint = self.api_url + "/api/v1/docs/"

        payload = {
            "name": name,
            "url_pdf": url_pdf,
            "external_id": None,
            "signers": [
                {
                    "name": signer_name,
                    "email": signer_email,
                    "auth_mode": "assinaturaTela",
                    "send_automatic_email": True,
                    "send_automatic_whatsapp": False
                }
            ],
            "lang": "es",
            "disable_signer_emails": False,
            "folder_path": "/",
            "signature_order_active": False,
        }

        headers = {
            "Authorization": f"Bearer {self.api_token}",
            "Content-Type": "application/json"
        }

        try:
            response = requests.post(endpoint, headers=headers, json=payload)
            response.raise_for_status() # Raise error for 4xx and 5xx status codes
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}
        