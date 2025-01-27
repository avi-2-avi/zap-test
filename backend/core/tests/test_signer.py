from rest_framework.test import APITestCase
from django.urls import reverse
from core.models.signer import Signer
from core.models.document import Document
from core.models.company import Company

class SignerAPITestCase(APITestCase):
    def setUp(self):
        self.company = Company.objects.create(name='Test Company', api_token='abcd1234')
        self.document = Document.objects.create(name='Test Document', openID='123456', company_id=self.company.id)
        self.signer = Signer.objects.create(
            name="John Doe",
            email="john@example.com",
            status="Pending",
            document_id=self.document.id
        )    
        self.list_url = reverse('signers')
        self.detail_url = reverse('signer-detail', args=[self.signer.id])
    
    def test_list_signers(self):
        response = self.client.get(self.list_url)
        self.assertIn("data", response.data)
        self.assertIn("message", response.data)
        
        signers = response.data["data"]
        self.assertEqual(len(signers), 1)
        self.assertEqual(signers[0]["name"], self.signer.name)

    def test_update_signer(self):
        data = {"name": "Jane Doe", "email": "jane@example.com", "status": "new"}
        response = self.client.patch(self.detail_url, data)
        self.assertIn("data", response.data)
        self.assertIn("message", response.data)
        
        signer = response.data["data"]
        self.assertEqual(signer["name"], "Jane Doe")