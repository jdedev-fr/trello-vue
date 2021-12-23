import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from "../views/Login.vue"
import Inscription from "../views/Inscription.vue"
import Taches from "../views/Taches.vue"
import MonCompte from "../views/MonCompte.vue"
import Deco from "../views/Deco.vue"


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/inscription',
    name: 'Inscription',
    component: Inscription
  },
  {
    path: '/taches',
    name: 'Taches',
    component: Taches
  },
  {
    path: '/mon-compte',
    name: 'Mon compte',
    component: MonCompte
  },
  {
    path: '/deco',
    name: 'Deco',
    component: Deco
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
