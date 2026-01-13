#!/bin/bash

# Installer les dépendances du projet
npm install

# Démarrer l'application Angular
ng serve --host=0.0.0.0 --port ${FRONT_PORT} --poll 2000
