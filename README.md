# Vue 3 SSR with Webpack 4 HMR

[Play with it right in the browser!](https://stackblitz.com/github/cyberap/vue3-ssr-webpack4-hmr)

## Features

- Hot reloading for everything inside `src` folder
- Production-ready build

### Integrations

- [`vue-router`](https://next.router.vuejs.org/)
- [`vue-meta`](https://github.com/nuxt/vue-meta/tree/next)
- [`vue-query`](https://vue-query.vercel.app/)

## Commands

- `start`: SSR in hot module reload mode, updates as you edit!
- `serve`: SSR in production mode with all the builds compiled

## Folder structure

- `dist`: compiled assets split by compilation target (`client`, `server`). `dist/client` is served by express by default.
- `public`: static assets. Served by express by default.
- `server`: all the server-side code. Please not that code from `src` should never point to this folder.
- `src`: your project's code
- `webpack`: place to store all the webpack configs. The configs are split by target and environment with a base config as a common ancestor.

## TODO

- Critical CSS for production
- Collect async JS request and inline them in markup
