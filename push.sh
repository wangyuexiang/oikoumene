#!/usr/bin/env bash
# One-shot publish: run from inside this folder after creating an EMPTY public repo on GitHub.
#   ./push.sh wangyuexiang/oikoumene
set -euo pipefail
REPO="${1:?usage: ./push.sh owner/repo}"
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$REPO.git"
git branch -M main
git push -u origin main --tags
# GitHub Release v0.1.0 from CHANGELOG (needs `gh auth login` once)
if command -v gh >/dev/null; then
  gh release create v0.1.0 --repo "$REPO" --title "Oikoumene 0.1.0" --notes-file CHANGELOG.md || true
  gh repo edit "$REPO" --description "Interactive historical atlas of the Old World, 500 BCE → 2000 CE. Borders, relief, cities with every name they've had, people with their journeys." --homepage "https://oikoumene.pages.dev" --add-topic history --add-topic map --add-topic atlas --add-topic d3 --add-topic historical-maps --add-topic timeline --add-topic gis || true
fi
echo "pushed $REPO — now connect it on Cloudflare Pages (output dir: public) or Vercel."
