import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import FloatingVue from "floating-vue";
import "floating-vue/dist/style.css";

import VueClickAway from "vue3-click-away";

import "./assets/tailwind.css";
import http from "./composables/http";
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(FloatingVue);
app.use(VueClickAway);

app.config.globalProperties.$http = http;

app.mount("#app");
