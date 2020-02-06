import { Server, Model } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  let server = new Server({
    environment,

    models: {
      sabor: Model,
      tamanho: Model,
      personalizacao: Model
    },

    routes () {
      this.namespace = 'api'

      this.get('/sabor', () => {
        return [
          {
            id: 1,
            sabor: 'Banana',
            tempoPreparo: 0
          },
          {
            id: 2,
            sabor: 'Morango',
            tempoPreparo: 0
          },
          {
            id: 3,
            sabor: 'Kiwi',
            tempoPreparo: 5
          }
        ]
      })

      this.get('/tamanho', () => {
        return [
          {
            id: 1,
            tamanho: 'Pequeno - 300ml',
            tempoPreparo: 5,
            valor: 10
          },
          {
            id: 2,
            tamanho: 'Médio - 500ml',
            tempoPreparo: 7,
            valor: 13
          },
          {
            id: 3,
            tamanho: 'Grande - 700ml',
            tempoPreparo: 10,
            valor: 15
          }
        ]
      })

      this.get('/personalizacao', () => {
        return [
          {
            id: 1,
            item: 'Granola',
            tempoPreparo: 0,
            valor: 0
          },
          {
            id: 2,
            item: 'Leite em pó',
            tempoPreparo: 0,
            valor: 3
          },
          {
            id: 3,
            item: 'Paçoca',
            tempoPreparo: 3,
            valor: 3
          }
        ]
      })
    }
  })
  return server
}
