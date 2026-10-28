from django.db import models
from django.utils.translation import get_language

# Create your models here.

class Price(models.Model):
    name = models.CharField(max_length=100)
    description_ru = models.CharField(max_length=1000)
    description_uz = models.CharField(max_length=1000)
    description_en = models.CharField(max_length=1000)
    model = models.CharField(max_length=100)
    price = models.IntegerField()

    def __str__(self):
        return self.name

    @property
    def description(self):
        # описание на текущем языке сайта (ru, uz или en)
        return getattr(self, f'description_{get_language()}', self.description_ru)
