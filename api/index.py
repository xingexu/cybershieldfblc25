import os

# Ensure Django settings are configured
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cybershield_project.settings")

from vercel_wsgi import handle  # type: ignore
from cybershield_project.wsgi import application


def handler(event, context):
    return handle(event, context, application)


