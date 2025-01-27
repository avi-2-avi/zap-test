from rest_framework.test import APITestCase
from django.urls import reverse
from core.models.company import Company

class CompanyAPITestCase(APITestCase):
    def setUp(self):
        self.company = Company.objects.create(name="Test Company", api_token="abcd1234")
        self.list_url = reverse("companies") 

    def test_list_companies(self):
        response = self.client.get(self.list_url)
        self.assertIn("data", response.data)
        self.assertIn("message", response.data)

        companies = response.data["data"]
        self.assertEqual(len(companies), 1)
        self.assertEqual(companies[0]["name"], self.company.name)

    def test_create_company(self):
        data = {"name": "New Company 2", "api_token": "xyz12345"} 
        response = self.client.post(self.list_url, data)

        self.assertIn("data", response.data)
        self.assertIn("message", response.data)

        new_company = response.data["data"] 
        self.assertEqual(new_company["name"], "['New Company 2']")
        self.assertEqual(new_company["api_token"], "['xyz12345']")