#!/bin/sh -x

# Example script for launching tests in docker with PhantomJS 1

BUILD_NUMBER=1

export COMPOSE_PROJECT_NAME=boomerang

COMPOSE_CMD="docker-compose -f docker-compose.boomerang.yml -f docker-compose.selenium-hub.yml -f docker-compose.phantomjs1.yml"
export BASHPARAMS="-c 'grunt -v clean test --build-number=${BUILD_NUMBER} --buildNumber=${BUILD_NUMBER} --schema-version=9120 --config-as-json=true --test-browser=PhantomJS --force --selenium-address=http://selenium-hub:4444/wd/hub'"

${COMPOSE_CMD} pull
${COMPOSE_CMD} build --pull
${COMPOSE_CMD} up --no-build --exit-code-from boomerang --remove-orphans
