import os
from django.conf.urls.defaults import *

path = os.path.join(os.path.dirname(__file__), "js")

urlpatterns = patterns('', 
    url(r'^js/(?P<path>.*)$', 'django.views.static.serve', {'document_root': path}),
)