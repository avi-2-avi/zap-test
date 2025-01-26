from django.urls import path
from core.views.company_view import CompanyView

urlpatterns = [
    path('companies/', CompanyView.as_view(), name="company-list"),
]