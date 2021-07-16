#!/bin/sh -x

# Example script for launching tests in docker with SauceLabs
# SAUCE_USERNAME and SAUCE_ACCESS_KEY need to be set in your env

BUILD_NUMBER=1

export COMPOSE_PROJECT_NAME=boomerang

export CAPABILITIES='{"maxDuration": "5400", "platformName": "iOS", "deviceName": "iPhone X Simulator", "platformVersion": "13.4", "deviceOrientation": "portrait", "recordVideo": "false", "recordScreenshots": "false"}'
COMPOSE_CMD="docker-compose -f docker-compose.boomerang.yml -f docker-compose.selenium-hub.yml -f docker-compose.sauce-connect.yml"
export BASHPARAMS="-c 'grunt -v clean test --build-number=${BUILD_NUMBER} --buildNumber=${BUILD_NUMBER} --schema-version=9120 --config-as-json=true --test-browser=Safari --force --selenium-address=http://${SAUCE_USERNAME}:${SAUCE_ACCESS_KEY}@sauce-connect:4445/wd/hub'"

${COMPOSE_CMD} pull
${COMPOSE_CMD} build --pull
${COMPOSE_CMD} up --no-build --exit-code-from boomerang --remove-orphans
