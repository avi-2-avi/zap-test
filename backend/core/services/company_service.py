from core.models.company import Company

def get_all_companies():
    return Company.objects.all()

def create_company(data):
    return Company.objects.create(**data)