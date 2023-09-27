#!/bin/bash

# Required to make sure docker runs with the right user
# May need to delete .env to refresh
rm -f docker/.env-dev
echo "export CURRENT_HOST_USER_UID=$(id -u)" >> docker/.env-dev
echo "export CURRENT_HOST_USER_GID=$(id -g)" >> docker/.env-dev
cp -n docker/.env-dev docker/.env

# docker setup
. docker/create-code-volume.sh

# Ensure the docker network exists (for non-devcontainer users)
docker network create ckeditor-network || true
