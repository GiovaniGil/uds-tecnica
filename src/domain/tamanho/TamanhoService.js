import Vue from 'vue'

export default class TamanhoService {
  lista () {
    return Vue.http.get('/api/tamanho')
      .then(response => response.data, err => {
        console.log(err)
      })
  }
  cadastra (sabor) {
    console.log(sabor)
  }

  apaga (id) {
    console.log(id)
  }

  busca (id) {
    console.log(id)
  }
}
