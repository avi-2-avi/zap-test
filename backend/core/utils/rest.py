from rest_framework.response import Response
from rest_framework import status

class RestfulResponse:
    @staticmethod
    def success(data=None, message="Sucess", status_code=status.HTTP_200_OK):
        return Response({"data": data, "message": message}, status=status_code)

    @staticmethod
    def error(data=None, message="Error", errors=None, status_code=status.HTTP_400_BAD_REQUEST):
        return Response({"data": data, "message": message}, status=status_code)