from core.views.base_view import BaseApiView
from core.services.company_service import get_all_companies, create_company
from core.serializers.company_serializer import CompanySerializer

class CompanyView(BaseApiView):
    def get(self, request):
       companies = get_all_companies()
       serializer = CompanySerializer(companies, many=True)
       return self.success_response(data=serializer.data)
    
    def post(self, request):
        try:
            data = request.data
            company = create_company(data)
            serializer = CompanySerializer(company)
            return self.success_response(data=serializer.data)
        except Exception as e:
            return self.error_response(message="Failed to create company", errors=str(e))
        
