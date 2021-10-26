import { createSSRApp } from "vue";
import { createMetaManager, plugin as metaPlugin } from "vue-meta";
import { createWebHistory } from "vue-router";
import { createAppRouter } from "./router/router.js";
import { QueryClient, hydrate, VUE_QUERY_CLIENT } from "vue-query";
import App from "./App.vue";

const start = async () => {
  const app = createSSRApp(App);

  const router = createAppRouter({ history: createWebHistory() });
  app.use(router);

  const metaManager = createMetaManager();
  app.use(metaManager);
  app.use(metaPlugin);

  const queryState = JSON.parse(
    document.querySelector("[data-query-state]").textContent
  );
  const client = new QueryClient();
  hydrate(client, queryState);
  client.mount();
  app.provide(VUE_QUERY_CLIENT, client);

  await router.isReady();

  app.mount("#app");
};

start();
