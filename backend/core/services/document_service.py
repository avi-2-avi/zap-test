from rest_framework.pagination import PageNumberPagination
from core.models.document import Document

class DocumentPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'  
    max_page_size = 100 

def get_paginated_documents(request):
    documents = Document.objects.all() 
    paginator = DocumentPagination()
    paginated_documents = paginator.paginate_queryset(documents, request)
    return paginated_documents, paginator
