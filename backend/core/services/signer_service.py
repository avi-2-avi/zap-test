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

def create_signer(data):
    return Signer.objects.create(**data)

def update_signer(signer_id, data):
    try:
        signer = Signer.objects.get(id=signer_id)
        for key, value in data.items():
            setattr(signer, key, value)
        signer.save()
        return signer
    except Signer.DoesNotExist:
        raise ValueError("Signer not found")