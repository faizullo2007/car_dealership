from django.shortcuts import render
from price.models import Price

# Create your views here.

def home(request):
    price = Price.objects.order_by('id')
    brands = price.values_list('name', flat=True).distinct().order_by('name')
    return render(request, 'home.html', {'price': price, 'brands': brands})
