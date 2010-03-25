from models import Todo
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.core import serializers
from django.http import HttpResponse
from django import forms
from django.utils import simplejson

from lawnchair.utils import get, delete, save

def get(request):
    return get(Todo.objects.all())

def delete(request):
    key = request.POST.get("key")
    return delete(Todo.objects.get(pk=key))
    
def save(request):
    key = request.POST.get("key")
    return save(Todo.objects.get(pk=key))
    
def listing(request):
    return render_to_response("list.html", {}, context_instance=RequestContext(request))
    