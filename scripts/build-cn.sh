#!/usr/bin/env bash
# Build dist-cn/ (Chinese + English, no blocked CDNs). Does not touch public/.
set -euo pipefail
cd "$(dirname "$0")/.."
exec node scripts/build-cn.mjs
