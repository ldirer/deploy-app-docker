# This image will contain the javascript code as well since it's nginx serving it.
# Using multi-stage docker build for a smaller final image.
FROM node:9.5 AS jsbuilder

ARG COMMIT_HASH=''
ARG SENTRY_DSN
ARG GOOGLE_ANALYTICS_TRACK_ID

COPY ./client /client
WORKDIR /client

# This is so the build include the relevant commit hash in sentry releases.
ENV COMMIT_HASH $COMMIT_HASH
ENV SENTRY_DSN $SENTRY_DSN
ENV GOOGLE_ANALYTICS_TRACK_ID $GOOGLE_ANALYTICS_TRACK_ID
RUN npm install
RUN npm run build

# Multi-stage means the build context needs to be the same, that's a bit disappointing (coupling!)...
FROM nginx:1.13.9-alpine

COPY deploy/nginx.conf /etc/nginx/nginx.conf

COPY --from=jsbuilder /client/dist/ app/
# Make sure sourcemaps are not served (but I still want to access them later on to upload them to sentry)
RUN mkdir app-sourcemaps && mv app/static/js/*.js.map app-sourcemaps

EXPOSE 8000 4430
