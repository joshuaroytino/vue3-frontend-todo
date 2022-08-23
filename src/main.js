import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import axios from "axios";
import { createPinia } from "pinia";

axios.defaults.withCredentials = true;

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
