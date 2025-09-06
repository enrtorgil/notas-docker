FROM php:8.3-fpm-alpine
ENV COMPOSER_ALLOW_SUPERUSER=1

# libs runtime
RUN apk add --no-cache git unzip sqlite-libs

# deps de compilación + extensión sqlite
RUN apk add --no-cache --virtual .build-deps $PHPIZE_DEPS sqlite-dev \
    && docker-php-ext-configure pdo_sqlite --with-pdo-sqlite=/usr \
    && docker-php-ext-install pdo pdo_sqlite \
    && apk del .build-deps

# composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html
