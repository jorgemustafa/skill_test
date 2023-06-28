from django.contrib import admin

from .models import Company, Employee


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ['name', 'cnpj', 'active']
    readonly_fields = ['created_at']


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['name', 'cpf', 'email', 'company', 'vacation_days', 'active']
    readonly_fields = ['created_at']
