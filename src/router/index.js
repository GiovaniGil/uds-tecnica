import Vue from 'vue'
import VueRouter from 'vue-router'
import PedidoView from '../views/PedidoView.vue'
import Personalizacao from '../components/personalizacao/Personalizacao.vue'
import ResumoPedido from '../components/resumo/ResumoPedido'
import store from '../components/store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'pedido',
    component: PedidoView
  },
  {
    path: '/personalizacao',
    name: 'personalizacao',
    component: Personalizacao,
    beforeEnter (to, from, next) {
      if (!store.state.entidade) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/resumo',
    name: 'resumo',
    component: ResumoPedido,
    beforeEnter (to, from, next) {
      if (!store.state.entidade) {
        next('/')
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
