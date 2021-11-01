FROM nginx:1.21.3 as grpc-web

LABEL maintainer="Emil Shari <emil.shari87@gmail.com>"

ARG NGINX_PORT
ARG NGINX_SSL_PORT
ARG NGINX_VERSION
ARG NGINX_HOST

VOLUME /tmp

RUN usermod --non-unique --uid 1000 www-data

# Install lua libraries for working with environment variables and so on.
RUN apt-get upgrade -y && \
    apt-get update -y && \  
    apt-get install --no-install-recommends --no-install-suggests -y \
    curl \ 
    netcat \
    net-tools \
    gettext-base \
    ca-certificates && \
    apt-get remove --purge --auto-remove -y && \ 
    rm -rf /var/lib/apt/lists/*

# Remove default configuration files, it will be overrided straightforwardly.
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

RUN usermod -s /bin/bash www-data

# Copying all of the required configs with overrided structure.
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/default.http.conf /etc/nginx/conf.d/default.http.conf
COPY config/default.stream.conf /etc/nginx/conf.d/default.stream.conf

# Add corresponded templates into new entity.
COPY config/template/*.conf /etc/nginx/template/*.conf

# Link default logs files into the dev-stream.
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Enable runtime in docker-entrypoint.sh config. Enable in production only.
# COPY lib/web/docker-entrypoint.sh /
# RUN chmod a+x /docker-entrypoint.sh && \
#     chown -R www-data:www-data /docker-entrypoint.sh

EXPOSE ${NGINX_PORT}/TCP
EXPOSE ${NGINX_SSL_PORT}/TCP

STOPSIGNAL SIGTERM

ENTRYPOINT ["/docker-entrypoint.sh"]

CMD [ "nginx", "-g", "daemon off;" ]