import os
from decouple import config

port = config("PORT", default="8000")
os.system(f"python manage.py runserver {port}")
