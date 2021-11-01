# MIT License

# Copyright (c) 2021 Emil Shari <emil.shari87@gmail.com>

# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:

# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.

# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

FROM node:14.18.1 as grpc-server

LABEL maintainer="Emil Shari <emil.shari87@gmail.com>"

ARG ENV
ARG PORT
ARG HOST

RUN usermod --non-unique --uid 1000 node  

USER node

RUN usermod -s /bin/bash node

ENV NODE_ENV ${ENV}
ENV NODE_PORT ${PORT}
ENV NODE_HOST ${HOST}

WORKDIR /var/www/grpc/$NODE_ENV/prod

# Install package dependencies.
ADD --chown=node:node server/package* ./
# Enable frozen lockfile only for production environment.
RUN yarn install --frozen-lockfile
ADD --chown=node:node server/ .

# Copy essential tsconfig.*.json into previous folder.
COPY --chown=node:node tsconfig.*.json ../*.json

# Prebuild shenanigans with yarn.
RUN yarn run build
ADD --chown=node:node server/build .

EXPOSE ${NODE_PORT}/TCP

STOPSIGNAL SIGTERM

ENTRYPOINT yarn run $NODE_ENV
