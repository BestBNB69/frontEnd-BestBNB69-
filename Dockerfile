FROM node:22-bullseye

WORKDIR /app

RUN apt update && apt install -y curl \
  && npm install -g @angular/cli --unsafe-perm \
  && apt clean

EXPOSE 8000

COPY ./scripts/entrypoint.local.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["bash", "/usr/local/bin/entrypoint.sh"]
