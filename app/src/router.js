import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import LoginTemplate from "./views/login-routes/LoginTemplate.vue"
import { isLogged } from "./utils";

const routes = [
  { path: "/", component: isLogged() ? Home : LoginTemplate },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router