Django Lawnchair
--------------------------------

This is a way to try and make managing django models easier in the client. It's just a wrapper
around Lawnchair: http://brianleroux.github.com/lawnchair/ which is a client side JSON document
store.

This is a 0.1, god I'd be surprised if this so much as worked.

Basically it tries to make easier with the sample libraries:

- getting data from Django, stuffing it into Lawnchair

- figuring out what data has changed in Lawnchair and pushing it back to Django

As such its pretty raw, but it might just work.

Mostly this is focused on the example that shows a sample to do application might work, if we
needed yet more buggy simple little to do apps (we don't).

To install the example:

- make sure you have lawnchair JS on your site (http://brianleroux.github.com/lawnchair/)

- make sure you have jquery JS on your site (http://jquery.com)

- add in django-lawnchair into your Python path (python setup.py install)

- add in example into your Django project

- add in "example" and "lawnchair" into your INSTALLED_APPS

Give it a play at /todo/list.

Your own project:

- basically you need to make three views on your model: get, save and delete. These will be need
  to be hooked by yourself in your URLs as you see fit, for example:
  
  url(r'^list/get/$', "example.views.get", name="todo-get"),
  url(r'^list/save/$', "example.views.save", name="todo-save"),
  url(r'^list/delete/$', "example.views.delete", name="todo-delete"),
  
- for each of those get, save and delete views there is a utility that will take the corresponding
  object or objects. eg:
  
    return get(objects), or delete(obj)

In the javascript end of things:

- var futon = new djangochair('/todo/list');

- to create a djangochair pointing at /todo/list... it will then append get, save, delete etc on to the end

- next:

    futon.remote_get(callback)

  This will call "get" and for each model returned, load them into the local client side database.
  
  Then you can call futon.update to alter your records.
 
- then

    futon.updated(function(r) {
        futon.remote_save(r);
    });

   Will run through and find every changed object and push them back into Django.


To do:

- gosh there's a lot to do

- make the syncing smarter

- django-piston

