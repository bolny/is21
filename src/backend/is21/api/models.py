from django.db import models


class Lane(models.Model):
    name = models.CharField(max_length=255)



class Paint(models.Model):
    lane = models.ForeignKey(Lane, on_delete=models.PROTECT)
    name = models.CharField(max_length=255)
    colour = models.CharField(max_length=100)
