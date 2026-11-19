#!/bin/bash
# Render every product short. Usage: bash shorts/engine/render_all.sh [slug ...]
cd "$(dirname "$0")/../.."
PY="$HOME/Library/Application Support/claude-seo/.venv/bin/python"
export PLAYWRIGHT_BROWSERS_PATH="$HOME/Library/Application Support/claude-seo/ms-playwright"
slugs=("$@"); [ ${#slugs[@]} -eq 0 ] && slugs=($(ls shorts/products | sed 's/\.json$//'))
for s in "${slugs[@]}"; do "$PY" shorts/engine/render.py "shorts/products/$s.json" 2>&1 | tail -1; done
