#!/bin/bash
source .env
pushd ./firefox
npm install --save-dev web-ext
../node_modules/.bin/web-ext sign --api-key=$AMO_API_KEY --api-secret=$AMO_API_SECRET --channel unlisted -v
popd