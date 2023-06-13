import Vue from 'vue'
import VueRouter from 'vue-router'
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
  routes
})

export default router
