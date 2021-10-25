# Vue 3 SSR with Webpack 4 HMR

## Features

- Hot reloading for everything inside `src` folder
- Production-ready build

### Integrations

- `vue-router`
- `vue-meta`
- `vue-query`

## Commands

- `dev`: SSR in hot module reload mode, updates as you edit!
- `serve`: SSR in production mode with all the builds compiled

## Folder structure

- `dist`: compiled assets split by compilation target (`client`, `server`). `dist/client` is served by express by default.
- `public`: static assets. Served by express by default.
- `server`: all the server-side code. Please not that code from `src` should never point to this folder.
- `webpack`: place to store all the webpack configs. The configs are split by target and environment with a base config as a common ancestor.

## TODO

- Critical CSS for production
- Collect async JS request and inline them in markup
