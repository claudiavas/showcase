#!/bin/bash
# Construye el portfolio y sincroniza el resultado con ../portfolio-pages,
# el repo que GitHub Pages publica en claudiavasquez.dev.
# El deploy real ocurre al hacer commit + push en portfolio-pages (rama main).
set -e
cd "$(dirname "$0")"

npm run build

rsync -a --delete \
  --exclude '.git' \
  --exclude '.github' \
  --exclude 'CNAME' \
  --exclude '.nojekyll' \
  --exclude 'README.md' \
  --exclude '404.html' \
  build/ ../portfolio-pages/

echo "Build sincronizado en portfolio-pages."
echo "Para publicar: cd ../portfolio-pages && git add -A && git commit && git push"
