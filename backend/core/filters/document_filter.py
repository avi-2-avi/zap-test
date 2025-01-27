from django_filters import rest_framework as filters
from core.models.document import Document

class DocumentFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")
    status = filters.CharFilter(field_name="status", lookup_expr="icontains")
    company_id = filters.NumberFilter(field_name="company_id", lookup_expr="exact")

    order_by = filters.OrderingFilter(
        fields=(
            ("name", "name"),
            ("status", "status"),
            ("created_at", "created_at"),
            ("last_updated_at", "last_updated_at"),
        ),
        field_labels={
            "name": "Name",
            "status": "Status",
            "created_at": "Creation Date",
            "last_updated_at": "Last Update",
        },
        label="Sort by"
    )

    class Meta:
        model = Document
        fields = ["name", "status", "company_id"]