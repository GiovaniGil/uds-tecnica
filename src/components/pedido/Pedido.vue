<template>
  <div>
    <!--<img alt="Acai" width="100" height="100"  src="../../assets/acai.png"/>-->
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
                  <v-toolbar-title>Informe nome, tamanho e o sabor desejado</v-toolbar-title>
                  <v-spacer />
                  </v-toolbar>
                <v-card-text>
                  <v-form v-model="formValido" ref="pedidoForm" :lazy-validation="lazy">
                    <v-text-field
                      v-model="entidade.clienteNome"
                      label="Nome"
                      name="nome"
                      prepend-icon="person"
                      type="text"
                      required
                      :rules="nomeRules"
                      :disabled="disableForm"
                    />

                     <v-select
                      v-model="entidade.tamanhoProduto"
                      return-object
                      :items="tamanhoItems"
                      item-text="tamanho"
                      item-value="id"
                      label="Tamanho"
                      prepend-icon="add_shopping_cart"
                      outlined
                      required
                      :rules="tamanhoProdutoRules"
                      :disabled="disableForm"
                    ></v-select>

                      <v-select
                      v-model="entidade.saborProduto"
                      return-object
                      :items="saborItems"
                      item-text='sabor'
                      item-value="id"
                      label="Sabor"
                      prepend-icon="local_dining"
                      outlined
                      required
                      :rules="saborProdutoRules"
                      :disabled="disableForm"
                    ></v-select>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn  @click="gravar()" color="primary" rounded>Personalizar pedido</v-btn>
                  <v-btn  @click="limpar()" color="primary" rounded>Limpar formulário</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-row align="center" justify="center" v-show="disableForm">
              <v-col>
                  <Personalizacao/>
              </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import Pedido from '../../domain/pedido/PedidoModel'
import EventBus from '../../../messages/event-bus'
import Personalizacao from '../personalizacao/Personalizacao'
import SaborService from '../../domain/sabor/SaborService'
import TamanhoService from '../../domain/tamanho/TamanhoService'
export default {
  name: 'Pedido',
  components: {
    Personalizacao
  },
  props: {
    msg: String
  },
  data: () => ({
    entidade: {},
    formValido: false,
    disableForm: false,
    lazy: false,
    nomeRules: [
      (v) => !!v || 'Campo "Nome" é obrigatório',
      (v) => (v && v.length <= 30) || 'Máximo de 30 caracteres'
    ],
    tamanhoProdutoRules: [
      (v) => !!v || 'Campo "Tamanho" é obrigatório'
    ],
    saborProdutoRules: [
      (v) => !!v || 'Campo "Sabor" é obrigatório'
    ],
    tamanhoItems: [],
    saborItems: [],
    errors: []
  }),
  created () {
    EventBus.$on('refazer', this.limpar)
    this.entidade = Object.assign({}, Pedido)

    // Carrega dados dos sabores disponíveis
    let saborService = new SaborService()
    saborService.lista().then(res => {
      this.saborItems = res
    }, err => console.log(err))

    // Carrega dados dos tamanhos disponíveis
    let tamanhoService = new TamanhoService()
    tamanhoService.lista().then(res => {
      this.tamanhoItems = res
    }, err => console.log(err))
  },
  mounted () {
    this.$refs.pedidoForm.reset()
  },
  methods: {
    gravar () {
      this.$refs.pedidoForm.validate()
      this.disableForm = this.formValido
      if (this.formValido) {
        EventBus.$emit('entidade', this.entidade)
      }
    },
    limpar () {
      this.entidade = Object.assign({}, Pedido)
      this.$refs.pedidoForm.reset()
      this.disableForm = false
    }
  },
  computed: {

  }
}
</script>
<style scoped lang="scss"></style>
