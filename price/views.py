from django.shortcuts import render
from .models import Price

# Create your views here.

def price(request):
    price = Price.objects.order_by('price')
    return render(request, 'price.html', {'price': price})
