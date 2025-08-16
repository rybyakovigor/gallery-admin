ARG NODE_VERSION=22.17.1
ARG NODE_IMAGE_NAME=alpine
ARG CONTAINER_IMAGE=node:${NODE_VERSION}-${NODE_IMAGE_NAME}

FROM ${CONTAINER_IMAGE} AS builder

ARG VITE_API_URL
ARG VITE_AUTH_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_AUTH_KEY=$VITE_AUTH_KEY

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn build

FROM nginx:1.29.0-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /var/www/html/

ENTRYPOINT ["nginx","-g","daemon off;"]
