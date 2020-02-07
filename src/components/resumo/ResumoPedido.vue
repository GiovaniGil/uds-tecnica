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
                  <v-toolbar-title>Resumo do pedido</v-toolbar-title>
                  <v-spacer />
                  </v-toolbar>
                <v-card-text>
                  <v-layout row wrap id="abaIndicador">
                    <v-flex xs12>
                      Nome: {{this.$store.state.entidade.clienteNome}}
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12>
                      Tamanho: {{this.entidade.tamanhoProduto.tamanho + ' - '+ formatReal(this.entidade.tamanhoProduto.valor)}}
                    </v-flex>
                    <v-flex xs12>
                      Sabor: {{this.entidade.saborProduto.sabor}}
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12 v-if="entidade.personalizacao.length > 0">
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
                              <v-list-item-title v-text="personalizacao.item + ' - ' + formatReal(personalizacao.valor)"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                      <v-divider></v-divider>
                    </v-flex>
                    <v-flex xs12>
                      Valor total: {{formatReal(valorTotal)}}
                    </v-flex>
                    <v-flex xs12>
                      Tempo de espera: {{tempoTotal + ' minutos'}}
                    </v-flex>
                  </v-layout>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn @click="gravar()"  color="success" rounded>Finalizar pedido</v-btn>
                  <v-btn @click="refazer()" color="primary" rounded>Novo pedido</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <v-card>
                <v-toolbar color="success" dark>
                  <v-toolbar-title>Pedido salvo!</v-toolbar-title>
                </v-toolbar>
                <v-spacer></v-spacer>
                <v-card-text>Seu pedido ficará pronto em breve. Obrigado!</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="success" @click="refazer()">Ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
          <v-row justify="center">
            <v-dialog v-model="dialogError" persistent max-width="290">
              <v-card>
                <v-toolbar color="error" dark>
                  <v-toolbar-title>Erro ao salvar</v-toolbar-title>
                </v-toolbar>
                <v-card-text>Entre em contato com o suporte técnico.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="refazer()">Ok</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import PedidoService from '../../domain/pedido/PedidoService'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ResumoPedido',
  props: [],
  created () {
  },
  beforeCreate () {
    if (!this.$store.state.entidade.clienteNome) {
      this.$router.push('/')
    }
  },
  mounted () {
  },
  data: () => ({
    money: {
      decimal: ',',
      thousands: '.',
      prefix: 'R$ ',
      suffix: ' #',
      precision: 2,
      masked: false
    },
    dialog: false,
    dialogError: false
  }),
  methods: {
    refazer () {
      this.resetState()
      this.$router.push('/')
    },
    gravar () {
      let pedidoService = new PedidoService()
      pedidoService.cadastra(this.entidade)
        .then(res => {
          console.log('200')
          this.dialog = true
        }, err => {
          console.log(err)
          this.dialogError = true
        })
    },
    ...mapMutations([
      'resetState'
    ]),
    formatReal (n) {
      return 'R$ ' + n.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+,)/g, '$1.')
    }
  },
  computed: {
    ...mapState({
      entidade: state => state.entidade
    }),
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
