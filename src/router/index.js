import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFoundView from "@/views/NotFoundView.vue";
import authRoutes from "./auth.route";
import todosRoute from "./todos.route";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  { ...todosRoute },
  { ...authRoutes },
  { path: "/:pathMatch(.*)*", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
