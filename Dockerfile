ARG NODE_VERSION=20.11.1
ARG NODE_IMAGE_NAME=alpine
ARG CONTAINER_IMAGE=node:${NODE_VERSION}-${NODE_IMAGE_NAME}

FROM ${CONTAINER_IMAGE} as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . ./
RUN yarn build

FROM nginx:1.27.0-alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /var/www/html/

ENTRYPOINT ["nginx","-g","daemon off;"]
