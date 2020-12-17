FROM nginx:1.19.5-alpine AS runtime
ENV NODE_ENV=production \
    MQTT_NET=1883 \
    MQTT_WS=8888 \
    GRAPHQL=4000 \
    ALPINE_MIRROR="http://dl-cdn.alpinelinux.org/alpine"
RUN echo "${ALPINE_MIRROR}/edge/main" >> /etc/apk/repositories
RUN apk update && \
    apk add --no-cache nodejs-current \
            yarn --repository="${ALPINE_MIRROR}/edge/community"
WORKDIR /psh
COPY package.json yarn.lock ./
COPY packages/api/package.json packages/api/
COPY packages/broker/package.json packages/broker/
COPY packages/db/package.json packages/db/
COPY packages/schema/package.json packages/schema/
COPY packages/services/package.json packages/services/
COPY packages/web/package.json packages/web/
RUN yarn install --frozen-lockfile --silent --non-interactive --ignore-optional

COPY . ./
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
EXPOSE 1883
CMD [ "./run.sh" ]