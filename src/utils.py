def model_to_modelform(model):
    meta = type('Meta', (), { "model":model, })
    modelform_class = type('modelform', (forms.ModelForm,), {"Meta": meta})
    return modelform_class

# view helpers
def get(objects):
    result = serializers.serialize("json", objects)
    return HttpResponse(result, mimetype='application/json')
    
def delete(obj):
    obj.delete()
    result = simplejson.dumps({"status":"deleted"})
    return HttpResponse(result, mimetype='application/json')

def save(obj):
    data = simplejson.loads(request.POST.get("data"))
    modelform_class = model_to_modelform(obj.__class__)
    modelform = modelform_class(data, instance=obj)    
    if modelform.is_valid():
        result = modelform.save(commit=True)    
    else:
        result = simplejson.dumps({"status":"error", "errors":result.errors})
        raise HttpResponse(result, mimetype='application/json')

    result = simplejson.dumps({"status":"saved"})
    return HttpResponse(result, mimetype='application/json')
    