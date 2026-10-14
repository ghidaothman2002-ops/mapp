"""Export the current Vite build as one interactive HTML, without changing sources."""
from pathlib import Path
import base64
import json
import mimetypes
import re
root = Path(__file__).resolve().parents[1]
dist = root / 'dist'
html = (dist / 'index.html').read_text()
script_url = re.search(r'<script[^>]*src="([^"]+)"[^>]*></script>', html).group(1)
css_url = re.search(r'<link[^>]*href="([^"]+\.css)"[^>]*>', html).group(1)
js = (dist / script_url.removeprefix('/mapp/')).read_text()
css = (dist / css_url.removeprefix('/mapp/')).read_text()
assets = {}
def data_url(path):
    mime = mimetypes.guess_type(path)[0] or 'application/octet-stream'
    return 'data:' + mime + ';base64,' + base64.b64encode(path.read_bytes()).decode()
def js_asset(match):
    url = match.group(1)
    path = dist / url.removeprefix('/mapp/')
    if not path.is_file():
        raise RuntimeError('Missing local asset: ' + url)
    assets[url] = data_url(path)
    return 'window.__MIN_HUNA_ASSETS[' + json.dumps(url) + ']'
js = re.sub(r'"(/mapp/(?:art|images|assets|brand)/[^"\s]+\.(?:png|jpg|jpeg|webp|svg))"', js_asset, js)
def photo_asset(match):
    local = match.group(1)
    url = '/mapp/' + local
    path = dist / local
    if not path.is_file():
        raise RuntimeError('Missing photo: ' + local)
    assets[url] = data_url(path)
    return 'window.__MIN_HUNA_ASSETS[' + json.dumps(url) + ']'
js = re.sub(r'"(photos/[a-z0-9-]+\.(?:jpg|png|webp))"', photo_asset, js)
if not assets:
    raise RuntimeError('No art resources found; inspect this build before exporting.')
def css_asset(match):
    url = match.group(1).strip('\'"')
    if url.startswith('data:') or url.startswith('#'):
        return match.group(0)
    return 'url(' + data_url(dist / url.removeprefix('/mapp/')) + ')'
css = re.sub(r'url\(([^)]+)\)', css_asset, css)
js = ('window.__MIN_HUNA_ASSETS=' + json.dumps(assets) + ';\n' + js).replace('</script', '<\\/script')
html = re.sub(r'<script[^>]*src="[^"]+"[^>]*></script>', lambda _: '<script type="module">' + js + '</script>', html)
html = re.sub(r'<link[^>]*href="[^"]+\.css"[^>]*>', lambda _: '<style>' + css + '</style>', html)
out = dist / 'min-huna-map-interactive.html'
out.write_text(html)
print(out, out.stat().st_size, 'bytes;', len(assets), 'embedded image resource(s)')
