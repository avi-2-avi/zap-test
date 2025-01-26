from rest_framework import serializers
from core.models.signer import Signer

class SignerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Signer
        fields = '__all__'