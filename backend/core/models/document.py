from django.db import models
from .company import Company

class Document(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    openID = models.IntegerField(null=False)
    token = models.CharField(max_length=255, null=False)
    name = models.CharField(max_length=255, null=False)
    status = models.CharField(max_length=50, null=False)
    externalID = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    last_updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name