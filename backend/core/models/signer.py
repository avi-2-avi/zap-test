from django.db import models
from .document import Document

class Signer(models.Model):
    id = models.AutoField(primary_key=True)
    document = models.ForeignKey(Document, on_delete=models.CASCADE)
    token = models.CharField(max_length=255, null=False)
    name = models.CharField(max_length=255, null=False)
    status = models.CharField(max_length=50, null=False)
    email = models.EmailField(max_length=255, null=False)
    externalID = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name