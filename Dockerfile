# ---------- frontend build ----------
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- php deps ----------
FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader --no-interaction --no-scripts
COPY . .
RUN composer dump-autoload --optimize --no-dev

# ---------- runtime ----------
FROM php:8.3-cli-alpine
WORKDIR /var/www/html

RUN apk add --no-cache bash libzip-dev oniguruma-dev postgresql-dev icu-dev \
    && docker-php-ext-install pdo pdo_pgsql intl

COPY --from=vendor /app /var/www/html
COPY --from=frontend /app/public/build /var/www/html/public/build

RUN chmod -R 775 storage bootstrap/cache

CMD ["sh", "-lc", "php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"]
