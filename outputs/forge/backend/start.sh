#!/bin/sh
set -eu
if [ ! -f .env ]; then cp .env.example .env; fi
if ! grep -q '^APP_KEY=base64:' .env; then php artisan key:generate --force; fi
mkdir -p /app/storage/db
touch /app/storage/db/database.sqlite
export DB_DATABASE=/app/storage/db/database.sqlite
php artisan migrate --force
php artisan serve --host=0.0.0.0 --port=8000
