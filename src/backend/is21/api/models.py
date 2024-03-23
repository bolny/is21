from django.db import models


class Lane(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name



class Paint(models.Model):
    lane = models.ForeignKey(Lane, on_delete=models.PROTECT)
    name = models.CharField(max_length=255)
    colour = models.CharField(
        max_length=100,
        verbose_name="Colour in hex format, ie. '#a1a1a1'"
    )
    text_colour = models.CharField(
        max_length=100,
        verbose_name="Colour in hex format, ie. '#a1a1a1'"
    )
    amount = models.IntegerField(verbose_name="Amount in liters", default=0)
