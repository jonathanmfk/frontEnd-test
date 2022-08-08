import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    component: HomeView
  },
  {
    path: '/character/:id',
    name: '/character',
    component: () => import(/* webpackChunkName: "about" */ '../components/Character.vue')
  },
  {
    path: '/exercises',
    name: '/exercises',
    component: () => import(/* webpackChunkName: "about" */ '../components/Other-exercises.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
