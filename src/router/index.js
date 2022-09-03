import { createRouter, createWebHistory } from "vue-router";
import NotFoundView from "@/views/NotFoundView.vue";
import authRoutes from "./auth.route";
import todosRoute from "./todos.route";
import { useAuthStore } from "@/stores/auth.store";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: { name: "login" },
  },
  { ...todosRoute },
  { ...authRoutes },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const publicPages = ["/auth/login"];
  const isPublicPage = publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (isPublicPage && authStore.isLoggedIn) {
    return "/todos";
  }

  if (!isPublicPage && !authStore.isLoggedIn) {
    return "/auth/login";
  }
});

export default router;
