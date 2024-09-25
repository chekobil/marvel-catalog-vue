#!/bin/bash
SOURCE="dist/index.html"
DESTINATION="dist/404.html" # for vercel
DESTINATION2="dist/200.html" # for surge.sh

if [ -f "$SOURCE" ]; then
    cp "$SOURCE" "$DESTINATION"
    cp "$SOURCE" "$DESTINATION2"
    echo "postbuild script"
fi
