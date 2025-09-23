import json
from pathlib import Path
from typing import Dict, List, Optional

from django import template
from django.conf import settings
from django.templatetags.static import static

register = template.Library()

_MANIFEST_CACHE: Optional[Dict] = None


def _load_manifest() -> Dict:
  global _MANIFEST_CACHE
  if _MANIFEST_CACHE is not None:
    return _MANIFEST_CACHE

  manifest_path = Path(settings.BASE_DIR) / 'static' / 'frontend' / 'manifest.json'

  if not manifest_path.exists():
    _MANIFEST_CACHE = {}
    return _MANIFEST_CACHE

  try:
    with manifest_path.open('r', encoding='utf-8') as handle:
      _MANIFEST_CACHE = json.load(handle)
  except json.JSONDecodeError:
    _MANIFEST_CACHE = {}

  return _MANIFEST_CACHE


@register.simple_tag
def vite_asset(entrypoint: str) -> str:
  manifest = _load_manifest()
  entry = manifest.get(entrypoint)
  if not entry:
    return ''
  file_path = entry.get('file')
  if not file_path:
    return ''
  return static(f'frontend/{file_path}')


@register.simple_tag
def vite_css(entrypoint: str) -> List[str]:
  manifest = _load_manifest()
  entry = manifest.get(entrypoint, {})
  css_files = entry.get('css', [])
  if not css_files:
    return []
  return [static(f'frontend/{path}') for path in css_files]
