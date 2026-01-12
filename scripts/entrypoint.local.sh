#!/bin/bash
set -e

npm install
ng serve --host 0.0.0.0 --port 8000 --poll 2000
