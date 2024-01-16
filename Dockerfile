FROM node:latest as build-stage
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_KEYCLOAK_URL
ARG REACT_APP_KEYCLOAK_REALM
ARG REACT_APP_KEYCLOAK_CLIENT_ID
ARG REACT_APP_DEFAULT_MODE
ARG REACT_APP_SWITCHABLE_MODE
ARG REACT_APP_CREATABLE_ORGANIZATION
ARG REACT_APP_CREATABLE_REGION
ARG REACT_APP_CREATABLE_INSTANCE
COPY . /app
WORKDIR /app
RUN npm install
RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build
RUN rm -rf /app/build/static/js/*.map
FROM nginx:alpine as production-stage
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80