from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WebsiteSettingsView, ProjectViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')

urlpatterns = [
    path("settings/", WebsiteSettingsView.as_view(), name="website-settings"),
    path("", include(router.urls)),
]
