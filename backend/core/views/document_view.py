from core.views.base_view import BaseApiView
from core.services.document_service import get_paginated_documents, create_document, update_document, delete_document
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
            return RestfulResponse.error_response(
                message="Failed to fetch documents", 
                errors=str(e)
            )

    def post(self, request):
        try:
            data = request.data
            document = create_document(data)
            
            serializer = DocumentSerializer(document)
            
            return RestfulResponse.success_response(
                data=serializer.data,
                message="Document created successfully"
            )
        except Exception as e:
            return RestfulResponse.error_response(
                message="Failed to create document", 
                errors=str(e)
              )

    def patch(self, request, document_id):
        try:
            data = request.data
            document = update_document(document_id, data)
            serializer = DocumentSerializer(document)
            return RestfulResponse.success_response(
                data=serializer.data,
                message="Document updated successfully"
            )
        except Exception as e:
            return RestfulResponse.error_response(
                message="Failed to update document",
                errors=str(e)
            )

    def delete(self, request, document_id):
        try:
            delete_document(document_id)
            return RestfulResponse.success_response(
                message="Document deleted successfully",
                status_code=204
            )
        except Exception as e:
            return RestfulResponse.error_response(
                message="Failed to delete document",
                errors=str(e)
            )