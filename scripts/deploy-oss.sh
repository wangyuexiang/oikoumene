#!/usr/bin/env bash
# Upload dist-cn/ to Alibaba Cloud OSS (Hong Kong by default).
# Requires ossutil 1.7+ or ossutil 2.x on PATH.
#
#   export OSS_BUCKET=your-bucket
#   export OSS_REGION=oss-cn-hongkong          # optional
#   export ALIBABA_CLOUD_ACCESS_KEY_ID=...
#   export ALIBABA_CLOUD_ACCESS_KEY_SECRET=...
#   ./scripts/deploy-oss.sh
#
# index.html is Cache-Control: no-cache. Everything under data/ is cached for one day.
# Other files (vendor JS, images) are also cached for one day.
# Content-Type is set from the file extension so HTML is served as text/html.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist-cn"
: "${OSS_BUCKET:?set OSS_BUCKET}"
OSS_REGION="${OSS_REGION:-oss-cn-hongkong}"
: "${ALIBABA_CLOUD_ACCESS_KEY_ID:?set ALIBABA_CLOUD_ACCESS_KEY_ID}"
: "${ALIBABA_CLOUD_ACCESS_KEY_SECRET:?set ALIBABA_CLOUD_ACCESS_KEY_SECRET}"
ENDPOINT="${OSS_ENDPOINT:-${OSS_REGION}.aliyuncs.com}"

if [[ ! -f "$DIST/index.html" || ! -f "$DIST/vendor/d3.min.js" ]]; then
  echo "dist-cn/ is missing. Run ./scripts/build-cn.sh first." >&2
  exit 1
fi
if ! command -v ossutil >/dev/null 2>&1; then
  echo "ossutil is not on PATH. Install ossutil 1.7+ or 2.x from Alibaba Cloud, then retry." >&2
  echo "https://www.alibabacloud.com/help/en/oss/developer-reference/ossutil-overview" >&2
  exit 1
fi

ver="$(ossutil --version 2>&1 || ossutil version 2>&1 || true)"
major=1
if grep -qE 'v?2\.' <<<"$ver"; then major=2; fi

ctype_for() {
  case "$1" in
    *.html) printf '%s' 'text/html;charset=utf-8' ;;
    *.js) printf '%s' 'text/javascript;charset=utf-8' ;;
    *.json) printf '%s' 'application/json;charset=utf-8' ;;
    *.webp) printf '%s' 'image/webp' ;;
    *.svg) printf '%s' 'image/svg+xml' ;;
    *.css) printf '%s' 'text/css;charset=utf-8' ;;
    *.txt|*.md) printf '%s' 'text/plain;charset=utf-8' ;;
    *.png) printf '%s' 'image/png' ;;
    *.jpg|*.jpeg) printf '%s' 'image/jpeg' ;;
    *) printf '%s' 'application/octet-stream' ;;
  esac
}
cache_for() {
  local rel="$1"
  if [[ "$rel" == "index.html" ]]; then
    printf '%s' 'no-cache'
  else
    printf '%s' 'public, max-age=86400'
  fi
}

cfg=""
if [[ "$major" == 1 ]]; then
  cfg="$(mktemp)"
  chmod 600 "$cfg"
  cat >"$cfg" <<EOF
[Credentials]
language=EN
endpoint=${ENDPOINT}
accessKeyID=${ALIBABA_CLOUD_ACCESS_KEY_ID}
accessKeySecret=${ALIBABA_CLOUD_ACCESS_KEY_SECRET}
EOF
fi
cleanup() { [[ -n "$cfg" && -f "$cfg" ]] && rm -f "$cfg"; }
trap cleanup EXIT

upload() {
  local src="$1" key="$2" cache="$3" ctype="$4"
  local dest="oss://${OSS_BUCKET}/${key}"
  if [[ "$major" == 2 ]]; then
    OSS_ACCESS_KEY_ID="$ALIBABA_CLOUD_ACCESS_KEY_ID" \
    OSS_ACCESS_KEY_SECRET="$ALIBABA_CLOUD_ACCESS_KEY_SECRET" \
    OSS_REGION="$OSS_REGION" \
    ossutil cp "$src" "$dest" --force \
      --content-type "$ctype" \
      --cache-control "$cache" \
      --metadata "Cache-Control:${cache}"
  else
    ossutil cp -f "$src" "$dest" \
      --config-file "$cfg" \
      -e "$ENDPOINT" \
      -i "$ALIBABA_CLOUD_ACCESS_KEY_ID" \
      -k "$ALIBABA_CLOUD_ACCESS_KEY_SECRET" \
      --meta "Cache-Control:${cache}#Content-Type:${ctype}"
  fi
}

count=0
while IFS= read -r -d '' f; do
  rel="${f#"$DIST"/}"
  upload "$f" "$rel" "$(cache_for "$rel")" "$(ctype_for "$rel")"
  count=$((count + 1))
done < <(find "$DIST" -type f -print0)

echo "uploaded ${count} files to oss://${OSS_BUCKET}/ (${OSS_REGION})"
