<template>
  <div>
    <v-app id="inspire">
      <v-content>
        <v-container
        fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Resumo do seu pedido</v-toolbar-title>
                  <v-spacer />
                  </v-toolbar>
                <v-card-text>
                  <v-layout row wrap id="abaIndicador">
                    <v-flex xs12>
                      Nome: {{this.entidade.clienteNome}}
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12>
                      Tamanho: {{this.entidade.tamanhoProduto ? this.entidade.tamanhoProduto.tamanho : 0}}
                    </v-flex>
                    <v-flex xs12>
                      Sabor: {{this.entidade.saborProduto ? this.entidade.saborProduto.sabor : 0 }}
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12>
                     <v-list disabled>
                        <v-subheader>Items adicionais: </v-subheader>
                        <v-list-item-group v-model="entidade.personalizacao" color="primary">
                          <v-list-item
                            v-for="(personalizacao, i) in entidade.personalizacao"
                            :key="i"
                          >
                            <v-list-item-icon>
                              <v-icon>check_box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title v-text="personalizacao.item"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12>
                      Valor total: R$ {{valorTotal}}
                    </v-flex>
                    <v-flex xs12>
                      Tempo de espera: {{tempoTotal + ' minutos'}}
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="gravar()"  color="success" rounded>Finalizar pedido</v-btn>
                  <v-btn @click="refazer()" color="error" rounded>Refazer Pedido</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import EventBus from '../../../messages/event-bus'
import PedidoService from '../../domain/pedido/PedidoService'
export default {
  name: 'ResumoPedido',
  props: [],
  created () {
    EventBus.$on('resumir', this.setEntidade)
  },
  mounted () {

  },
  data: () => ({
    entidade: {},
    money: {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: ' #',
      precision: 2,
      masked: false /* doesn't work with directive */
    }
  }),
  methods: {
    setEntidade: function (entidade) {
      this.entidade = entidade
    },
    refazer () {
      this.entidade.personalizacao = []
      this.exibeResumo = false
      EventBus.$emit('refazer', this.entidade)
    },
    gravar () {
      let pedidoService = new PedidoService()
      pedidoService.cadastra(this.entidade)
        .then(res => {
          console.log('200')
        }, err => console.log(err))
    }
  },
  computed: {
    valorTotal () {
      let valorTotal = 0
      if (this.entidade.tamanhoProduto) {
        valorTotal = valorTotal + this.entidade.tamanhoProduto.valor
      }
      if (this.entidade.personalizacao) {
        valorTotal += this.entidade.personalizacao
          .map(item => item.valor)
          .reduce((prev, curr) => prev + curr, 0)
      }
      return valorTotal
    },
    tempoTotal () {
      let tempoTotal = 0
      if (this.entidade.tamanhoProduto) {
        tempoTotal += this.entidade.tamanhoProduto.tempoPreparo
        tempoTotal += this.entidade.saborProduto.tempoPreparo
      }
      if (this.entidade.personalizacao) {
        tempoTotal += this.entidade.personalizacao.map(item => item.tempoPreparo).reduce((prev, curr) => prev + curr, 0)
      }
      return tempoTotal
    }
  }
}

</script>

<style scoped lang="scss"></style>
