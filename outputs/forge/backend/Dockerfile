FROM php:8.3-cli
RUN apt-get update && apt-get install -y --no-install-recommends libsqlite3-dev libonig-dev libxml2-dev unzip git && docker-php-ext-install pdo_sqlite mbstring dom xml xmlwriter && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
WORKDIR /app
COPY . .
RUN mkdir -p bootstrap/cache storage/framework/cache/data storage/framework/sessions storage/framework/views storage/logs database && composer install --no-interaction --prefer-dist
EXPOSE 8000
CMD ["sh", "start.sh"]
