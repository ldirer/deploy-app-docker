# This image will contain the javascript code as well since it's nginx serving it.
# Using multi-stage docker build for a smaller final image.
FROM node:9.5 AS jsbuilder

ARG COMMIT_HASH=''

COPY ./client /client
WORKDIR /client

# This is so the build include the relevant commit hash in sentry releases.
ENV COMMIT_HASH $COMMIT_HASH
RUN npm install
RUN npm run build

# Multi-stage means the build context needs to be the same, that's a bit disappointing (coupling!)...
FROM alpine:latest

RUN apk add --no-cache nginx

# Note we use a more restricted context for this dockerfile (facebook/deploy/conf)
COPY deploy/nginx.conf /etc/nginx/nginx.conf

COPY --from=jsbuilder /client/dist/ app/
# Make sure sourcemaps are not served (but I still want to access them later on to upload them to sentry)
RUN mkdir app-sourcemaps && mv app/static/js/*.js.map app-sourcemaps
CMD nginx

EXPOSE 8000 4430
