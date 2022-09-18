import axios from "axios";
import { defineStore } from "pinia";

const baseUrl = `${process.env.VUE_APP_BASE_API_URL}`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  actions: {
    async login({ email, password }) {
      try {
        const response = await axios.post(`${baseUrl}/token`, {
          email,
          password,
        });

        const { user } = response.data.data;

        this.user = user;

        localStorage.setItem("user", JSON.stringify(user));

        return [null, response];
      } catch (error) {
        return [error, null];
      }
    },
    async register({ name, email, password, confirm_password }) {
      try {
        const response = await axios.post(`${baseUrl}/register`, {
          name,
          email,
          password,
          confirm_password,
        });

        return [null, response];
      } catch (error) {
        return [error, null];
      }
    },
    async logout() {
      try {
        const response = await axios.post(`${baseUrl}/logout`);

        this.clearStorage();

        return [null, response];
      } catch (error) {
        this.clearStorage();
        return [error, null];
      }
    },
    async verifyEmail(url) {
      try {
        const queryParams = url.query;

        const response = await axios.get(
          `${baseUrl}/verify-email/${url.params.id}/${url.params.hash}`,
          { params: queryParams }
        );

        return [null, response];
      } catch (error) {
        return [error, null];
      }
    },
    async resendEmailVerification(data) {
      try {
        const response = await axios.post(
          `${baseUrl}/email/verification-notification`,
          data
        );

        return [null, response];
      } catch (error) {
        return [error, null];
      }
    },
    async forgotPassword(data) {
      try {
        const response = await axios.post(`${baseUrl}/forgot-password`, data);

        return [null, response];
      } catch (error) {
        return [error, null];
      }
    },
    clearStorage() {
      this.user = null;
      localStorage.removeItem("user");
    },
  },
  getters: {
    isLoggedIn() {
      return !!this.user;
    },
  },
});
