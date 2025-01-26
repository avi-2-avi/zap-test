from core.views.base_view import BaseApiView
from core.services.signer_service import get_paginated_signers, update_signer
from core.serializers.signer_serializer import SignerSerializer
from core.utils.rest import RestfulResponse

class SignerView(BaseApiView):
    def get(self, request):
        try:
            signers, paginator = get_paginated_signers(request)
            
            serializer = SignerSerializer(signers, many=True)
            
            return RestfulResponse.paginated_response(
                data=serializer.data,
                count=paginator.page.paginator.count,
                next_url=paginator.get_next_link(),
                prev_url=paginator.get_previous_link(),
                message="Signers fetched successfully"
            )
        except Exception as e:
            return RestfulResponse.error_response(message="Failed to fetch signers", errors=str(e))

    def patch(self, request, signer_id):
        try:
            data = request.data
            signer = update_signer(signer_id, data)
            serializer = SignerSerializer(signer)
            return RestfulResponse.success_response(
                data=serializer.data,
                message="Signer updated successfully"
            )
        except Exception as e:
            return RestfulResponse.error_response(
                message="Failed to update signer",
                errors=str(e)
            )