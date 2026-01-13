FROM node:22-bullseye
WORKDIR /app

# Installer les dépendances système
RUN apt update && apt install -y zsh curl && sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Installer Angular CLI globalement
RUN npm install -g @angular/cli --unsafe-perm

# Exposer le port défini dans la variable d'environnement FRONT_PORT
EXPOSE ${FRONT_PORT}

# Copier le script d'entrée
COPY ./scripts/entrypoint.local.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Définir le point d'entrée
ENTRYPOINT ["bash", "entrypoint.sh"]
