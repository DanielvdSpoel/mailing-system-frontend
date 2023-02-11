import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import { useUserStore } from "@/stores/user";
import { Preferences } from "@capacitor/preferences";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: { requiresAuth: false },
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },
    },
  ],
});

//Collect data from cache
router.beforeEach(async () => {
  const userStore = useUserStore();
  const { value: token } = await Preferences.get({ key: "token" });
  if (token) {
    await userStore.setToken(token);
  }
  const { value: user } = await Preferences.get({ key: "user" });
  if (user) {
    userStore.setUser(user);
  }
});

router.beforeEach(async (to) => {
  if (!useUserStore().isAuthenticated && to.meta.requiresAuth) {
    // redirect the user to the login page
    return { name: "login" };
  }
});

export default router;
