import { createRouter, createWebHistory } from "vue-router";
import NotFoundView from "@/views/NotFoundView.vue";
import authRoutes from "./auth.route";
import todosRoute from "./todos.route";
import { useAuthStore } from "@/stores/auth.store";
import VerifyInform from "@/views/VerifyInform.vue";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "login" },
  },
  {
    path: "/need-verification",
    component: VerifyInform,
  },
  { ...todosRoute },
  { ...authRoutes },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const publicPages = ["/auth/login", "/auth/register"];
  const statelessPages = ["verify-email", "resend-verify-email"];

  const isPublicPage = publicPages.includes(to.path);
  const isStatelessPage = statelessPages.includes(to.name);
  const authStore = useAuthStore();

  if (isPublicPage && !isStatelessPage && authStore.isLoggedIn) {
    return "/todos";
  }

  if (!isPublicPage && !isStatelessPage && !authStore.isLoggedIn) {
    return "/auth/login";
  }
});

export default router;
