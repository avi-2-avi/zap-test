from core.views.base_view import BaseApiView
from core.services.document_service import get_paginated_documents
from core.serializers.document_serializer import DocumentSerializer
from core.utils.rest import RestfulResponse

class DocumentView(BaseApiView):
    def get(self, request):
        try:
            documents, paginator = get_paginated_documents(request)
            
            serializer = DocumentSerializer(documents, many=True)
            
            return RestfulResponse.paginated_response(
                data=serializer.data,
                count=paginator.page.paginator.count,
                next_url=paginator.get_next_link(),
                prev_url=paginator.get_previous_link(),
                message="Documents fetched successfully"
            )
        except Exception as e:
            return self.error_response(message="Failed to fetch documents", errors=str(e))
