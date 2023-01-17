import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import {useUserStore} from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
      meta: {requiresAuth: false}
    },
    {
      path: "/about",
      name: "about",
      meta: {requiresAuth: true},
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (!useUserStore().isAuthenticated && to.meta.requiresAuth) {
    // redirect the user to the login page
    return {name: 'login'}
  }
})

export default router;
