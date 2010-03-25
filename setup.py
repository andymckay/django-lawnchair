from distutils.core import setup
setup(name='django-lawnchair',
      version='0.1.1',
      description='Libraries to make working with Django and Lawnchair easier',
      author="Andy McKay",
      url = "http://github.com/andymckay/django-lawnchair",
      author_email="andy@clearwind.ca",
      packages=["lawnchair",],
      package_dir = {'lawnchair':'src'},
      package_data = {'lawnchair': ['js/*']},
      classifiers = [
        "Development Status :: 2 - Pre-Alpha",
        "Framework :: Django"
        ]
      )