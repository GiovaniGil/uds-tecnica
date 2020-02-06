import Vue from 'vue'

export default class PedidoService {
  lista () {
  }
  cadastra (pedido) {
    return Vue.http.post('/api/pedido', pedido)
      .then(response => {
        console.log(pedido)
      }, err => {
        console.log(err)
      })
  }

  apaga (id) {
    console.log(id)
  }

  busca (id) {
    console.log(id)
  }
}
