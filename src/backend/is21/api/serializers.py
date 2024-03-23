import re

from django.contrib.auth.models import User
from django.core.validators import RegexValidator
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
            'id',
            'name',
        ]


class PaintSerializer(serializers.HyperlinkedModelSerializer):
    lane = serializers.PrimaryKeyRelatedField(queryset=Lane.objects.all())
    # Validate that the colour entered is a valid hex value.
    hex_color_regex = r'^#(?:[0-9a-fA-F]{3}){1,2}$'
    colour = serializers.CharField(
        validators=[RegexValidator(regex=hex_color_regex,
        message="Colour must be a hex string, ie. '#a1a1a1'")]
    )
    text_colour = serializers.CharField(
        validators=[RegexValidator(regex=hex_color_regex,
        message="Colour must be a hex string, ie. '#a1a1a1'")]
    )

    class Meta:
        model = Paint
        fields = [
            'url',
            'id',
            'lane',
            'name',
            'colour',
            'text_colour',
            'amount',
        ]
