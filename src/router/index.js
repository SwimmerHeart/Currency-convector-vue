import Vue from 'vue'
import VueRouter from 'vue-router'
// import HomeView from '../views/Home-page.vue'
import HomeViewInput from '../views/Home-page-input'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeViewInput
  },
  {
    path: '/exchange',
    name: 'exchange',

    component: () => import('../views/Currency-page.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
