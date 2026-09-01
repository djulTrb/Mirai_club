from rest_framework import viewsets
from .models import Album, GalleryImage
from .serializers import AlbumSerializer, GalleryImageSerializer
from apps.accounts.permissions import IsAdminOrReadOnly


class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.prefetch_related('images').all()
    serializer_class = AlbumSerializer
    permission_classes = [IsAdminOrReadOnly]


class GalleryImageViewSet(viewsets.ModelViewSet):
    queryset = GalleryImage.objects.all()
    serializer_class = GalleryImageSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        # We assume the frontend passes 'album_id' in the request,
        # or we could make it a nested router. Let's just allow standard create.
        album_id = self.request.data.get('album')
        if album_id:
            serializer.save(album_id=album_id)
        else:
            serializer.save()
