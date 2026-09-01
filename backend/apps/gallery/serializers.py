from rest_framework import serializers
from .models import Album, GalleryImage


class GalleryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalleryImage
        fields = ["id", "image_url", "uploaded_at"]
        read_only_fields = ["id", "uploaded_at"]


class AlbumSerializer(serializers.ModelSerializer):
    images = GalleryImageSerializer(many=True, read_only=True)

    class Meta:
        model = Album
        fields = ["id", "title", "images", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]
