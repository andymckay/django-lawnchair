from django.shortcuts import render_to_response
from django.template import RequestContext

from models import Todo
from lawnchair import utils

def get(request):
    return utils.get(Todo.objects.all())

def delete(request):
    key = request.POST.get("key")
    return utils.delete(Todo.objects.get(pk=key))
    
def save(request):
    key = request.POST.get("key")
    data = request.POST.get("data")
    return utils.save(Todo.objects.get(pk=key), data)
    
def listing(request):
    return render_to_response("list.html", {}, context_instance=RequestContext(request))
    