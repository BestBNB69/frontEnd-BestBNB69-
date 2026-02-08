FROM node:22-bullseye

WORKDIR /app

# Dépendances système
RUN apt update && apt install -y zsh curl bash

# Angular CLI
RUN npm install -g @angular/cli --unsafe-perm

# Copier le script d’entrée
COPY ./scripts/entrypoint.local.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 1800

ENTRYPOINT ["bash", "/usr/local/bin/entrypoint.sh"]
