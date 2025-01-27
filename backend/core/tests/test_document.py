from rest_framework.test import APITestCase
from django.urls import reverse
from core.models.document import Document
from core.models.company import Company

class DocumentAPITestCase(APITestCase):
    def setUp(self):
        self.company = Company.objects.create(name='Test Company', api_token='abcd1234')
        self.document = Document.objects.create(name='Test Document', openID='123456', company_id=self.company.id)
        self.list_url = reverse('documents')
        self.detail_url = reverse('document-detail', args=[self.document.id])
    
    def test_list_documents(self):
        response = self.client.get(self.list_url)
        self.assertIn("data", response.data)
        self.assertIn("message", response.data)

        documents = response.data["data"]
        self.assertEqual(len(documents), 1)
        self.assertEqual(documents[0]["name"], self.document.name)
    
    def test_create_documents(self):
        data = {
            "document_name": 'Test Document', 
            "company_id": self.company.id, 
            "url_pdf": "https://zapsign.s3.amazonaws.com/2022/1/pdf/63d19807-cbfa-4b51-8571-215ad0f4eb98/ca42e7be-c932-482c-b70b-92ad7aea04be.pdf",
            "signer_name": "Test Signer",
            "signer_email": "test@test.com",
            "api_token": "abcd1234"
        }
        response = self.client.post(self.list_url, data)

        # Should fail because api_token is not correct
        self.assertIn("message", response.data)
        self.assertIn("errors", response.data)
    
    def test_update_document(self):
        data = {"name": "Updated Document", "openID": "654321"}
        response = self.client.patch(self.detail_url, data)
        self.assertIn("data", response.data)
        self.assertIn("message", response.data)

        document = response.data["data"]
        self.assertEqual(document["name"], "Updated Document")
        self.assertEqual(document["openID"], 654321)
        
    def test_delete_document(self):
        response = self.client.delete(self.detail_url)
        self.assertIn("data", response.data)
        self.assertIn("message", response.data)

        response = self.client.get(self.list_url)
        documents = response.data["data"]
        self.assertEqual(len(documents), 0)