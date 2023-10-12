import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import Login from "./views/Login.vue"
import Register from "./views/Register.vue"
import { isLogged } from "./utils";

const routes = [
  { path: "/", component: isLogged() ? Home : Login },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router