# Pillow

This is a web app heavily inspired by [Blanket](https://github.com/rafaelmardojai/blanket).
It helps to improve focus and increase productivity by listening to different sounds.

[Demo](https://pillow.kimdanielkoch.de)

## Tech Stack

- [Vue.js](https://vuejs.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## Deployment

This App is published as OCI image to [docker hub](https://hub.docker.com/r/kimbo0o/pillow) and can be deployed using
docker-compose:

```yml
services:
  pillow:
    image: kimbo0o/pillow
    ports:
      - 8089:80
    restart: 'unless-stopped'
```

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
