from datetime import datetime, timezone
from rest_framework.pagination import PageNumberPagination
from core.models.document import Document
from core.utils.zapsign import ZapSign
from core.services.signer_service import create_signer
from core.filters.document_filter import DocumentFilter

class DocumentPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'  
    max_page_size = 100 

def get_paginated_documents(request):
    queryset = Document.objects.all()

    filterset = DocumentFilter(request.GET, queryset=queryset)
    if not filterset.is_valid():
        raise ValueError(filterset.errors)

    paginator = DocumentPagination()
    paginated_documents = paginator.paginate_queryset(filterset.qs, request)
    return paginated_documents, paginator

def create_document(data):
    try:
        try:
            # Save initial data of document
            initial_document = Document.objects.create(
                company_id = data['company_id'],
                openID = 0,
                token = "",
                name = data['document_name'],
                status = "draft",
            )

            # Save initial data of signer
            initial_signer = create_signer({
                "document_id": initial_document.id,
                "name": data['signer_name'],
                "email": data['signer_email'],
                "status": "draft",
            })
            
        except Exception as e:
            raise ValueError(str(e))

        # Send document to ZapSign API
        zapsign = ZapSign()
        response = zapsign.create_document(
            name=data['document_name'], 
            url_pdf=data['url_pdf'], 
            signer_name=data['signer_name'], 
            signer_email=data['signer_email']
        )

        if "error" in response:
            raise ValueError(response["error"])

        current_time = datetime.now(timezone.utc)

        # Update document with ZapSign information
        initial_document.openID = response.get("open_id", "")
        initial_document.token = response.get("token", "")
        initial_document.status = response.get("status", "draft")
        initial_document.externalID = response.get("external_id", "")
        initial_document.last_updated_at = current_time  
        initial_document.save()
        
        # Update signer with ZapSign information
        if response.get("signers"):
            first_signer = response["signers"][0] 
            initial_signer.token = first_signer.get("token", "")
            initial_signer.status = first_signer.get("status", "draft")
            initial_signer.externalID = first_signer.get("external_id", "")
            initial_signer.last_updated_at = current_time  
            initial_signer.save()

        return initial_document

    except Exception as e:
        raise ValueError(str(e))

def update_document(document_id, data):
    try:
        document = Document.objects.get(id=document_id)
        for key, value in data.items():
            setattr(document, key, value) 
        document.save()
        return document
    except Document.DoesNotExist:
        raise ValueError("Document not found")

def delete_document(document_id):
    try:
        document = Document.objects.get(id=document_id)
        document.delete()
        return True
    except Document.DoesNotExist:
        raise ValueError("Document not found")