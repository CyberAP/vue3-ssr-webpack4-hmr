import { createRouter } from "vue-router";
import { createHomeRoutes } from "./routes/home.js";
import { createAboutRoutes } from "./routes/about.js";

export const createAppRouter = ({ history }) => {
  const routes = [createHomeRoutes(), createAboutRoutes()];

  return createRouter({
    history,
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (to.fullPath === from.fullPath) return false;
      return savedPosition || { x: 0, y: 0 };
    },
  });
};
