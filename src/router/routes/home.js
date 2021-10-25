import HomePage from "../../pages/Home.vue";

export const createHomeRoutes = () => {
  return {
    name: "HOME",
    path: "/",
    component: HomePage,
  };
};
