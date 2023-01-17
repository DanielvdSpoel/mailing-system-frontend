import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/tailwind.css";
import http from "./composables/http";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.config.globalProperties.$http = http;

app.mount("#app");
