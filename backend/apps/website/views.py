from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import WebsiteSettings, Project
from .serializers import WebsiteSettingsSerializer, ProjectSerializer
from apps.accounts.permissions import IsAdminOrReadOnly


class WebsiteSettingsView(APIView):
    """
    GET /api/website/settings/  -> paramètres publics du site
    PUT /api/website/settings/  -> mise à jour (admin uniquement)
    """

    def get_permissions(self):
        if self.request.method == "GET":
            return [AllowAny()]
        return [IsAuthenticated()]

    def get(self, request):
        settings = WebsiteSettings.get()
        return Response(WebsiteSettingsSerializer(settings).data)

    def put(self, request):
        if not request.user.is_staff:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Accès réservé aux administrateurs.")
        settings = WebsiteSettings.get()
        serializer = WebsiteSettingsSerializer(settings, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]
