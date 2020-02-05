import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PedidoView from '../views/PedidoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pedido',
    name: 'pedido',
    component: PedidoView
  }
]

const router = new VueRouter({
  routes
})

export default router
