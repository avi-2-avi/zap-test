from rest_framework.pagination import PageNumberPagination
from core.models.signer import Signer 
from core.filters.signer_filter import SignerFilter

class SignerPagination(PageNumberPagination):
    page_size = 10  
    page_size_query_param = 'page_size'  
    max_page_size = 100 

def get_paginated_signers(request):
    queryset = Signer.objects.all()
    filterset = SignerFilter(request.GET, queryset=queryset)
    if not filterset.is_valid():
        raise ValueError(filterset.errors)

    paginator = SignerPagination()
    paginated_signers = paginator.paginate_queryset(filterset.qs, request)

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