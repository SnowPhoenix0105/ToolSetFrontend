import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import EncodingTransform from '../views/EncodingTransform.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/encoding-transform',
    name: '编码转换器',
    component: EncodingTransform,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
