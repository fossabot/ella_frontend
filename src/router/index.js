import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/services/:service',
    name: 'Service',
    component: () => import('../views/Service.vue')
  },
  {
    path: '/load',
    name: "Load",
    component: () => import('../views/Load.vue')
  },
  {
    path: '/html',
    name: "HTML",
    component: () => import('../views/HTMLResponse.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/notFound.vue')
  }
]

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
})

export default router
