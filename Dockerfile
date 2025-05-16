# 1. Build Stage
FROM node:22 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build


# 2. Production Stage
FROM nginx:alpine
LABEL org.opencontainers.image.authors="Kim Daniel Koch" \
 org.opencontainers.image.description="Container image for https://github.com/Kimbo0o/pillow"
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]