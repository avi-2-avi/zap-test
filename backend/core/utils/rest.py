from rest_framework.response import Response
from rest_framework import status

class RestfulResponse:
    @staticmethod
    def success_response(data=None, message="Sucess", status_code=status.HTTP_200_OK):
        return Response({"data": data, "message": message}, status=status_code)

    @staticmethod
    def error_response(data=None, message="Error", errors=None, status_code=status.HTTP_400_BAD_REQUEST):
        error_details = None

        if isinstance(errors, Exception):
            error_details = str(errors)

        elif errors:
            error_details = errors

        return Response({
            "success": False,
            "data": data,
            "message": message,
            "errors": error_details
        }, status=status_code)

    @staticmethod
    def paginated_response(data, count, next_url=None, prev_url=None, message="Success", status_code=status.HTTP_200_OK):
        return Response({
            "success": True,
            "message": message,
            "count": count,
            "next": next_url,
            "previous": prev_url,
            "data": data
        }, status=status_code)