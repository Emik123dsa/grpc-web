#!/usr/bin/env bash

set -eu

cp -R /etc/nginx/conf.d/default.http.conf /etc/nginx/conf.d/default.http.template
chmod a+x /etc/nginx/conf.d/default.http.template
chmod -R www-data:www-data /etc/nginx/conf.d/default.http.template

envsubst '${NGINX_VERSION} ${NGINX_SSL_PORT} ${NGINX_PORT} ${NGINX_HOST}' < /etc/nginx/conf.d/default.http.template > /etc/nginx/conf.d/default.http.conf

exec "$@"