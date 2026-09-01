from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlbumViewSet, GalleryImageViewSet

router = DefaultRouter()
router.register(r'albums', AlbumViewSet, basename='album')
router.register(r'images', GalleryImageViewSet, basename='galleryimage')

urlpatterns = [
    path("", include(router.urls)),
]
