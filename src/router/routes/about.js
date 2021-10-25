import AboutPage from "../../pages/About.vue";

export const createAboutRoutes = () => {
  return {
    name: "ABOUT",
    path: "/about",
    component: AboutPage,
  };
};
