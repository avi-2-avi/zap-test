import django_filters
from django_filters import rest_framework as filters
from core.models.signer import Signer

class SignerFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    email = filters.CharFilter(field_name="email", lookup_expr="icontains")
    status = filters.CharFilter(field_name="status", lookup_expr="icontains")
    document_id = filters.NumberFilter(field_name="document_id", lookup_expr="exact")

    order_by = filters.OrderingFilter(
        fields=(
            ("name", "name"),
            ("email", "email"),
            ("status", "status"),
        ),
        field_labels={
            "name": "Name",
            "email": "Email",
            "status": "Status",
        },
        label="Sort by"
    )

    class Meta:
        model = Signer
        fields = ["name", "email", "status", "document_id"]