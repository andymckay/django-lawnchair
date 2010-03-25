import os
from django.conf.urls.defaults import *

path = os.path.join(os.path.dirname(__file__), "media")

urlpatterns = patterns('',   
    url(r'^list$', "example.views.listing", name="todo-list"),
    url(r'^js/(?P<path>.*)$', 'django.views.static.serve', {'document_root': path}),

    url(r'^list/get/$', "example.views.get", name="todo-get"),
    url(r'^list/save/$', "example.views.save", name="todo-save"),
    url(r'^list/delete/$', "example.views.delete", name="todo-delete"),
    url(r'^lawnchair/', include("lawnchair.urls")),
)
