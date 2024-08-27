#!/bin/sh

set -e; # exit on error

printf "packaging\n"

printf "JS... "
cat src/ecmascript/index.js | babel -f bundle.min.js | esbuild --bundle > bundle/bundle.min.js
printf "OK\n"

printf "CSS... "
css-minify -o bundle -f src/cascadingstylesheets/index.css

printf "HTML... "
cat src/hypertextmarkuplanguage/index.html | html-minifier --collapse-whitespace --remove-comments --remove-optional-tags --remove-redundant-attributes --remove-script-type-attributes --remove-tag-whitespace --use-short-doctype --minify-css true --minify-js true > bundle/index.html
printf "OK\n"
