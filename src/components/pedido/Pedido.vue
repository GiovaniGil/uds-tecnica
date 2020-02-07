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
                  <v-toolbar-title>Informe os dados do pedido</v-toolbar-title>
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
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
import Pedido from '../../domain/pedido/PedidoModel'
import SaborService from '../../domain/sabor/SaborService'
import TamanhoService from '../../domain/tamanho/TamanhoService'
import { mapState } from 'vuex'
export default {
  name: 'Pedido',
  components: {
  },
  props: {
    msg: String
  },
  data: () => ({
    formValido: false,
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
    if (!this.$store.state.entidade) {
      this.$store.state.entidade = Object.assign({}, Pedido)
    }
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
      if (this.formValido) {
        this.$router.push('personalizacao')
      }
    },
    limpar () {
      this.$store.state.entidade = Object.assign({}, Pedido)
      this.$refs.pedidoForm.reset()
    }
  },
  computed: {
    ...mapState({
      entidade: state => state.entidade
    })
  }
}
</script>
<style scoped lang="scss"></style>
