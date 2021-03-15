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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/services/:service',
    name: 'Service',
    component: () => import(/* webpackChunkName: "Service" */ '../views/Service')
  },
  {
    path: '/load',
    name: "Load",
    component: () => import(/* webpackChunkName: "load" */ '../views/Load')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "notFound" */ '../views/notFound')

  }
]

const router = new VueRouter({
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes
})

export default router
