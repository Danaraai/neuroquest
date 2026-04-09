#!/bin/sh
export PATH="/usr/local/bin:$PATH"
cd "/Users/danara/Neuromatch learning app/neuroquest"
exec /usr/local/bin/node ./node_modules/.bin/next dev --webpack --port "${PORT:-3000}"
