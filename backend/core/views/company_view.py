from core.views.base_view import BaseApiView
from core.services.company_service import get_all_companies, create_company
from core.serializers.company_serializer import CompanySerializer
from core.utils.rest import RestfulResponse

class CompanyView(BaseApiView):
    def get(self, request):
        try:
            companies = get_all_companies()
            serializer = CompanySerializer(companies, many=True)
            return RestfulResponse.success_response(data=serializer.data)
        except Exception as e:
            return RestfulResponse.error_response(message="Failed to fetch companies", errors=str(e))
    
    def post(self, request):
        try:
            data = request.data
            company = create_company(data)
            serializer = CompanySerializer(company)
            return RestfulResponse.success_response(data=serializer.data, message="Company created successfully")
        except Exception as e:
            return RestfulResponse.error_response(message="Failed to create company", errors=str(e))