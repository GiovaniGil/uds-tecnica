import Vue from 'vue'
import VueRouter from 'vue-router'
import PedidoView from '../views/PedidoView.vue'
import PersonalizarView from '../views/PersonalizarView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pedido',
    component: PedidoView
  },
  {
    path: '/personalizar',
    name: 'personalizar',
    component: PersonalizarView
  },
  {
    method: 'GET',
    path: 'personalizacoes/',
    response: [
      { id: 14 },
      { id: 22 }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
