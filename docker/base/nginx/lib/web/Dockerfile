FROM nginx:1.21.3 as grpc-web

LABEL maintainer="Emil Shari <emil.shari87@gmail.com>"

# Override and create default context user.
# RUN set -x \
#     && addgroup --system --gid 101 www-data \
#     && adduser --system --disabled-login --ingroup www-data --no-create-home --home /nonexistent --gecos "www-data user" --shell /bin/false --uid 101 www-data

RUN usermod --non-unique --uid 1000 www-data

# gnupg1 will be removed.
RUN apt-get upgrade -y && \
    apt-get update -y && \  
    apt-get install --no-install-recommends --no-install-suggests -y ca-certificates \
    gettext-base \
    curl \ 
    net-tools \
    netcat && \
    apt-get remove --purge --auto-remove -y && \ 
    rm -rf /var/lib/apt/lists/*

RUN usermod -s /bin/bash www-data
# Remove default configuration files, it will be overrided straightforwardly.
RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copying all of the required configs with overrided structure.
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/default.http.conf /etc/nginx/conf.d/default.http.conf
COPY config/default.stream.conf /etc/nginx/conf.d/default.stream.conf

# Add corresponded templates into new entity.
COPY config/template/*.conf /etc/nginx/template/*.conf

# Link default logs files into the dev-stream.
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80/TCP
EXPOSE 443/TCP

STOPSIGNAL SIGTERM

CMD [ "nginx", "-g", "daemon off;" ]