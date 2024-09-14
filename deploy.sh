#!/usr/bin/env sh

# Остановить выполнение скрипта при ошибке
set -e

# Очистка директории dist
rm -rf dist

echo "Building project..."
npm run build

echo "Navigating to dist directory..."
cd dist

echo "Initializing git repository..."
git init
git add -A
git commit -m 'deploy'

echo "Pushing to GitHub..."
git push -f https://github.com/harpeng/vuePost.git master:gh-pages

echo "Deployment complete."
cd -
