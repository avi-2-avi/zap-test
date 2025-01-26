from django.urls import path
from core.views.company_view import CompanyView
from core.views.document_view import DocumentView
from core.views.signer_view import SignerView

urlpatterns = [
    path('companies/', CompanyView.as_view(), name="companies"),
    path('documents/', DocumentView.as_view(), name='documents'),
    path('signers/', SignerView.as_view(), name='signers'),
]