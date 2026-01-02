FROM          node:24
RUN           mkdir /app
WORKDIR       /app
COPY          ./ ./
RUN           npm install
ENTRYPOINT    ["ng", "serve"]
