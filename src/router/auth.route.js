import GuestLayout from "@/views/GuestLayout.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

export default {
  path: "/auth",
  component: GuestLayout,
  children: [
    { path: "", redirect: { name: "login" } },
    { path: "login", name: "login", component: LoginView },
    { path: "register", name: "register", component: RegisterView },
  ],
};
