"""
URL configuration for project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from app import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('getAppIcon/', views.get_app_icon, name='get_app_icon'),
    path('add_app/', views.add_app_view, name='add_app'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login'),
    path('get_all_apps/', views.get_all_apps, name='get_all_apps'),
    path('get_app/<int:app_id>/', views.get_app_by_id, name='get_app_by_id'),
    path('upload_image/', views.upload_image, name='upload_image'),
    path('check_task_completion/<int:app_id>/', views.check_task_completion, name='check_task_completion'),
    path('logout/', views.LogoutView, name='logout'),
    path('view-images/', views.admin_view_images, name='admin_view_images'),
    path('verify-image/<int:image_id>/<str:status>/', views.verify_image, name='verify_image'),
    path('get-user-points/', views.get_user_points, name='get_user_points'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)