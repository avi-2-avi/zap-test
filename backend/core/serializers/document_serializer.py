from rest_framework import serializers
from core.models.document import Document

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document 
        fields = '__all__'