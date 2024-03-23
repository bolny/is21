from django.urls import include, path
from rest_framework import routers

from is21.api import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'paint', views.PaintViewSet)
router.register(r'lane', views.LaneViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
