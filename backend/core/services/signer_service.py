from rest_framework.pagination import PageNumberPagination
from core.models.signer import Signer 

class DocumentPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'  
    max_page_size = 100 

def get_paginated_signers(request):
    signers = Signer.objects.all() 
    paginator = DocumentPagination()
    paginated_signers = paginator.paginate_queryset(signers, request)
    return paginated_signers, paginator
