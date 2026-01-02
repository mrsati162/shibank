FROM          node:24
RUN           mkdir /app
WORKDIR       /app
COPY          ./ ./
RUN           npm install
RUN           npm install -g @angular/cli
EXPOSE        4200
ENTRYPOINT    ["ng", "serve", "--host", "0.0.0.0"]
