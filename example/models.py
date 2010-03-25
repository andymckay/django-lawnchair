from django.db import models
from django.contrib import admin

class Todo(models.Model):
    text = models.TextField()
    completed = models.BooleanField(default=False)
    slug = models.SlugField()

    def __unicode__(self):
        return self.slug

class TodoAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("text",)}
    
admin.site.register(Todo, TodoAdmin)