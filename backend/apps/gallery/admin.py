from django.contrib import admin
from .models import Album, GalleryImage

class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 1

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ["title", "created_at"]
    search_fields = ["title"]
    inlines = [GalleryImageInline]

@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ["album", "image_url", "uploaded_at"]
    list_filter = ["album"]
