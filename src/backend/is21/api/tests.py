from django.test import TestCase

from is21.api.models import Lane
from is21.api.serializers import PaintSerializer

class PaintSerializerTestCase(TestCase):
    def setUp(self):
        Lane.objects.create(name="Available")

    def test_can_validate_hex_colour(self):
        serializer = PaintSerializer(
            data={
                'lane': 1,
                'name': "Taupe",
                'colour': "#a1a1a1",
                'amount': 0,
            }
        )
        self.assertTrue(serializer.is_valid())

    def test_non_hex_colour_raises_validation_error(self):
        serializer = PaintSerializer(
            data={
                'lane': 1,
                'name': "Taupe",
                'colour': "Not a hex value",
                'amount': 0,
            }
        )
        self.assertFalse(serializer.is_valid())
        self.assertIn('colour', serializer.errors)
