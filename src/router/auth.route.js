import GuestLayout from "@/views/GuestLayout.vue";
import LoginView from "@/views/LoginView.vue";

export default {
  path: "/auth",
  component: GuestLayout,
  children: [
    { path: "", redirect: { name: "login" } },
    { path: "login", name: "login", component: LoginView },
  ],
};
