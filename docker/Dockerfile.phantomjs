FROM debian:stretch

ARG PHANTOM_JS_VERSION
ENV PHANTOM_JS_VERSION ${PHANTOM_JS_VERSION:-2.1.1-linux-x86_64}

# Install runtime dependencies
RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        ca-certificates \
        bzip2 \
        libfontconfig \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Install official PhantomJS release
# Install dumb-init (to handle PID 1 correctly).
# https://github.com/Yelp/dumb-init
# Runs as non-root user.
# Cleans up.
RUN set -x  \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
        curl \
 && mkdir /tmp/phantomjs \
 && curl -L https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-${PHANTOM_JS_VERSION}.tar.bz2 \
        | tar -xj --strip-components=1 -C /tmp/phantomjs \
 && mv /tmp/phantomjs/bin/phantomjs /usr/local/bin \
 && curl -Lo /tmp/dumb-init.deb https://github.com/Yelp/dumb-init/releases/download/v1.1.3/dumb-init_1.1.3_amd64.deb \
 && dpkg -i /tmp/dumb-init.deb \
 && apt-get purge --auto-remove -y \
        curl \
 && apt-get clean \
 && rm -rf /tmp/* /var/lib/apt/lists/* \
 && useradd --system --uid 52379 -m --shell /usr/sbin/nologin phantomjs \
 && su phantomjs -s /bin/sh -c "phantomjs --version"

USER phantomjs

EXPOSE 8910

ENTRYPOINT ["dumb-init"]
CMD ["phantomjs"]
