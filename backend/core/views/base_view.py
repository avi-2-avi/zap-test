from rest_framework.views import APIView
from core.utils.rest import RestfulResponse

class BaseApiView(APIView):
    def handle_exception(self, exc):
        return RestfulResponse.error(
            message=str(exc),
            errors=getattr(exc, "detail", None),
            status_code=getattr(exc, "status_code", 400)
        )
    
    def success_response(self, data=None, message="Success", status_code=200):
        return RestfulResponse.success(data, message, status_code)
    
    def error_response(self, data=None, message="Error", errors=None, status_code=400):
        return RestfulResponse.error(data, message, errors, status_code)