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
                  <v-toolbar-title>Personalize seu pedido</v-toolbar-title>
                  <v-spacer />
                  </v-toolbar>
                <v-card-text>
                    <!--<p v-for="itemPersonalizacao in personalizacaoItems" v-bind:key="itemPersonalizacao.id">
                      <v-checkbox
                        v-model="entidade.personalizacao"
                        return-object
                        :label="itemPersonalizacao.item + ' - R$' + itemPersonalizacao.valor"
                        :value="itemPersonalizacao">
                      </v-checkbox>
                    </p>-->
                    <v-select
                      label="Personalizar"
                      required
                      :items="personalizacaoItems"
                      multiple
                      chips
                      return-object
                      item-text="item"
                      item-value="id"
                      v-model="entidade.personalizacao"
                    ></v-select>
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
import PersonalizacaoService from '../../domain/personalizacao/PersonalizacaoService'
export default {
  name: 'Personalizacao',
  props: [],
  mounted () {

  },
  created () {
    EventBus.$on('entidade', this.setEntidade)

    // Carrega dados das personalizações disponíveis
    let personalizacaoService = new PersonalizacaoService()
    personalizacaoService.lista().then(res => {
      this.personalizacaoItems = res
    }, err => console.log(err))
  },
  data: () => ({
    entidade: {},
    formValido: false,
    personalizacaoItems: []
  }),
  methods: {
    gravar () {
      console.log(JSON.stringify(this.entidade))
    },
    refazer () {
      this.entidade.personalizacao = []
      EventBus.$emit('refazer', this.setEntidade)
    },
    setEntidade: function (entidade) {
      this.entidade = entidade
      console.log(JSON.stringify(this.entidade))
      this.entidade.personalizacao = []
    }
  },
  computed: {

  }
}
</script>
<style scoped lang="scss"></style>
