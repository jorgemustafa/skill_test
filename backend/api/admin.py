from django.contrib import admin

from .models import Company, Employee


@admin.register(Company)
class TransacaoAdmin(admin.ModelAdmin):
    list_display = ['name', 'cnpj', 'active']
    readonly_fields = ['created_at']


@admin.register(Employee)
class ResponsavelFinanceiroAdmin(admin.ModelAdmin):
    list_display = ['name', 'cpf', 'email', 'company', 'active']
    readonly_fields = ['created_at']
