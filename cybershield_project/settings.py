import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-secret")
DEBUG = os.environ.get("DJANGO_DEBUG", "false").lower() in ("1", "true", "yes")

# Allow local hosts and dynamic Vercel preview/prod URLs
_vercel_url = os.environ.get("VERCEL_URL", "").replace("https://", "").replace("http://", "")
ALLOWED_HOSTS = [h for h in ["127.0.0.1", "localhost", "35.182.152.63", "d2r6sxfy47w9d0.cloudfront.net", _vercel_url] if h]

# CSRF Trusted Origins
CSRF_TRUSTED_ORIGINS = [o for o in ["http://localhost:8000", "http://127.0.0.1:8000", "https://d2r6sxfy47w9d0.cloudfront.net", f"https://{_vercel_url}" if _vercel_url else ""] if o]

INSTALLED_APPS = [
    # Custom admin interface (must come before django.contrib.admin)
    "admin_interface",
    "colorfield",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Additional packages
    "django_recaptcha",  # django-recaptcha for CAPTCHA functionality
    "django_ckeditor_5",  # CKEditor 5 for rich text editing
    # Our apps
    "forum.apps.ForumConfig",  # Specify the AppConfig class
]

# Fixture directories for loaddata command
FIXTURE_DIRS = [
    os.path.join(BASE_DIR),
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # Custom middleware to load demo data
    "forum.middleware.LoadDemoDataMiddleware",
]

ROOT_URLCONF = "cybershield_project.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],  # Global templates folder
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "cybershield_project.wsgi.application"

DATABASES = {
      "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_USER_MODEL = "forum.CustomUser"

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

# WhiteNoise static files settings for serverless
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# django-recaptcha settings (disabled for development)
# Use dummy keys for development to avoid SSL issues
RECAPTCHA_PUBLIC_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"  # Dummy key for development
RECAPTCHA_PRIVATE_KEY = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe"  # Dummy key for development
NOCAPTCHA = True

# Silence the test key warning for development
SILENCED_SYSTEM_CHECKS = ['django_recaptcha.recaptcha_test_key_error']

# Set the media root and URL
MEDIA_ROOT = os.path.join(
    BASE_DIR,
    "media",
)
MEDIA_URL = "/media/"


# CKEditor 5 configuration
CKEDITOR_5_CONFIGS = {
    "default": {
        "toolbar": [
            "bold",
            "italic",
            "|",
            "Subscript",
            "Superscript",
            "|",
            "link",
            "RemoveFormat",
        ],
    },
}

# Logging configuration
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "loggers": {
        "forum": {
            "handlers": ["console"],
            "level": "DEBUG",
        },
    },
}
