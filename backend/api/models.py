from django.db import models


class Company(models.Model):
    name = models.CharField(max_length=64)
    cnpj = models.CharField(max_length=64, unique=True)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Company'
        verbose_name_plural = 'Companies'

    def __str__(self):
        return self.name


class Employee(models.Model):
    name = models.CharField(max_length=64)
    cpf = models.CharField(max_length=64, unique=True)
    dt_birth = models.DateField()
    dt_start = models.DateField()
    dt_end = models.DateField()
    vacation_days = models.IntegerField()
    email = models.EmailField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Employee'
        verbose_name_plural = 'Employees'

    def __str__(self):
        return self.name
