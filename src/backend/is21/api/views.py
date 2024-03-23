from django.contrib.auth.models import User
from rest_framework import permissions, viewsets

from is21.api.models import Paint, Lane
from is21.api.serializers import UserSerializer, PaintSerializer, LaneSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class PaintViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows paints to be viewed or edited.
    """
    queryset = Paint.objects.all().order_by('-id')
    serializer_class = PaintSerializer
    permission_classes = [permissions.IsAuthenticated]


class LaneViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows paints to be viewed or edited.
    """
    queryset = Lane.objects.all().order_by('-id')
    serializer_class = LaneSerializer
    permission_classes = [permissions.IsAuthenticated]
