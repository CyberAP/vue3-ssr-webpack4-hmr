import { createSSRApp } from "@vue/runtime-dom";
import { renderToString } from "@vue/server-renderer";
import { createMetaManager, plugin as metaPlugin } from "vue-meta";
import { renderMetaToString } from "vue-meta/ssr";
import { createMemoryHistory } from "vue-router";
import { createAppRouter } from "./router/router.js";
import { QueryClient, dehydrate, VUE_QUERY_CLIENT } from "vue-query";
import App from "./App.vue";

export const render = async ({ url }) => {
  const app = createSSRApp(App);

  const router = createAppRouter({ history: createMemoryHistory() });
  app.use(router);

  const metaManager = createMetaManager(true);
  app.use(metaManager);
  app.use(metaPlugin);

  const client = new QueryClient();
  const query = {
    toJSON() {
      return dehydrate(client);
    },
  };
  client.mount();
  app.provide(VUE_QUERY_CLIENT, client);

  await router.push(url);
  await router.isReady();
  
  const sharedContext = {};
  const html = await renderToString(app, sharedContext);
  await renderMetaToString(app, sharedContext);

  return { html, meta: sharedContext.teleports, state: { query } };
};
