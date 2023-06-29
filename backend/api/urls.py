from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from .views import UserLogin, UserLogout, UserView, ChangePasswordView, CompanyView, CompanyUpdateView, \
    CompanyDeleteView, EmployeeView, EmployeeUpdateView, EmployeeDeleteView

urlpatterns = [
    # authentication
    path('login', UserLogin.as_view(), name='login'),
    path('logout', UserLogout.as_view(), name='logout'),
    path('user', UserView.as_view(), name='user'),
    path('password_change', ChangePasswordView.as_view(), name='change_password'),
    path('password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset')),

    # company
    path('company', CompanyView.as_view(), name='company'),
    path('company/<int:pk>', CompanyView.as_view(), name='company_id'),
    path('company/update/<int:pk>', CompanyUpdateView.as_view(), name='company_update'),
    path('company/delete/<int:pk>', CompanyDeleteView.as_view(), name='company_delete'),

    # employee
    path('employee', EmployeeView.as_view(), name='employee'),
    path('employee/<int:pk>', EmployeeView.as_view(), name='employee_id'),
    path('employee/update/<int:pk>', EmployeeUpdateView.as_view(), name='employee_update'),
    path('employee/delete/<int:pk>', EmployeeDeleteView.as_view(), name='employee_delete'),

    # swagger
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
