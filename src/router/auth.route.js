import GuestLayout from "@/views/GuestLayout.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import VerifyEmail from "@/views/VerifyEmail.vue";
import ResendVerifyEmail from "@/views/ResendVerifyEmail.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";

export default {
  path: "/auth",
  component: GuestLayout,
  children: [
    { path: "", redirect: { name: "login" } },
    { path: "login", name: "login", component: LoginView },
    { path: "register", name: "register", component: RegisterView },
    {
      path: "verify-email/:id/:hash",
      name: "verify-email",
      component: VerifyEmail,
    },
    {
      path: "resend-verify-email",
      name: "resend-verify-email",
      component: ResendVerifyEmail,
    },
    {
      path: "forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
    },
  ],
};
