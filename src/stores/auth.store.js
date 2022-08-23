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
  },
  getters: {
    isLoggedIn() {
      !!this.user;
    },
  },
});
