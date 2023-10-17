import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue"
import Marketplace from "./views/Marketplace.vue"
import Recipes from "./views/Recipes.vue"
import SingleRecipe from "./views/SingleRecipe.vue"
import LoginTemplate from "./views/login-routes/LoginTemplate.vue"
import { isLogged } from "./utils";

const routes = [
  { path: "/", component: isLogged() ? Home : LoginTemplate },
  { path: "/marketplace", component: Marketplace },
  { path: "/profile", component: Marketplace },
  { path: "/recipes", component: Recipes },
  { path: "/recipes/:id", component: SingleRecipe },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router