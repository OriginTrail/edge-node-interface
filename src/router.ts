import { createRouter, createWebHistory } from "@ionic/vue-router";
import axios from "axios";
import store from "./store";
import AppLayout from "./ui-components/edge-node/AppLayout.vue";

const routes = [
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
        meta: { requiresAuth: true },
      },
      {
        path: "/knowledge-bank",
        name: "KnowledgeBank",
        component: () =>
          import("./ui-components/edge-node/pages/KnowledgeBankPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/contribute",
        name: "Contribute",
        component: () =>
          import("./ui-components/edge-node/pages/ContributePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/ai-assistant",
        name: "AIAssistant",
        component: () =>
          import("./ui-components/edge-node/pages/AIAssistantPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: () =>
          import("./ui-components/edge-node/pages/Notifications.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/settings",
        name: "SettingsPage",
        redirect: "/",
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const hasUser = store.getters.getUser !== null;
  const authRequired = to.matched.some((record) => record.meta.requiresAuth);

  if (!hasUser || authRequired)
    return axios
      .get(`${import.meta.env.VITE_AUTH_SERVICE_ENDPOINT}/auth/check`, {
        withCredentials: true,
      })
      .then(async (response) => {
        const authEnabled = response.headers["x-auth-enabled"] !== "false";
        await store.dispatch("setAuthEnabled", authEnabled);
        if (authEnabled && authRequired && !response.data.authenticated)
          throw new Error("unauthenticated");
        return response.data.user;
      })
      .then(async (user) => {
        await store.dispatch("login", user);
        next();
      })
      .catch(async (e) => {
        await store.dispatch("logout");
        console.error(e);
        next("/login");
      });

  next();
});

export default router;
