import Vue from 'vue'
import VueRouter from 'vue-router'
import PedidoView from '../views/PedidoView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pedido',
    component: PedidoView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
