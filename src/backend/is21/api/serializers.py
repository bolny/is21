from django.contrib.auth.models import User
from rest_framework import serializers

from is21.api.models import Paint, Lane


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            'url',
            'username',
            'email',
            'first_name',
            'last_name',
            'is_superuser',
        ]


class LaneSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Lane
        fields = [
            'url',
            'name',
        ]


class PaintSerializer(serializers.HyperlinkedModelSerializer):
    lane = serializers.PrimaryKeyRelatedField(queryset=Lane.objects.all())

    class Meta:
        model = Paint
        fields = [
            'url',
            'lane',
            'name',
            'colour',
            'amount',
        ]
