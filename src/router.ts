import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import axios from "axios";
import store from "./store";
import AppLayout from "./ui-components/edge-node/AppLayout.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => {
          return import("./ui-components/edge-node/pages/Login.vue");
        },
        meta: { requiresAuth: false },
      },
      {
        path: "/",
        name: "LandingPage",
        component: () => {
          return import("./ui-components/edge-node/pages/LandingPage.vue");
        },
        meta: { requiresAuth: false },
      },
      {
        path: "/activities",
        name: "ActivityFeedPage",
        component: () => {
          return import("./ui-components/edge-node/pages/LandingPage/ActivityFeedPage.vue");
        },
        meta: { requiresAuth: false },
      },
      {
        path: "/explore",
        name: "KnowledgeGraphPage",
        component: () => {
          return import(
            "./ui-components/edge-node/pages/KnowledgeGraphPage.vue"
          );
        },
        meta: { requiresAuth: false },
        props: (route) => ({ ual: route.query.ual }),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (import.meta.env.VITE_AUTH_ENABLED?.toLowerCase() !== "true") {
    next();
  } else {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      axios
        .get(`${import.meta.env.VITE_AUTH_SERVICE_ENDPOINT}/auth/check`, {
          withCredentials: true,
        })
        .then(async (response) => {
          if (response.data.authenticated) {
            const user = store.getters.getUser;
            if (user === null) {
              await store.dispatch("login", response.data.user);
            }
            next();
          } else {
            next("/login");
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((e) => {
          next("/login");
        });
    } else {
      next();
    }
  }
});

export default router;
