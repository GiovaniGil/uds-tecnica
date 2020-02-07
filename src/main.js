import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VuePageTransition from 'vue-page-transition'
import vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueResource from 'vue-resource'
import { makeServer } from '../mock/server'
import store from './components/store/store'

Vue.use(VuePageTransition)
Vue.use(VueResource)

makeServer()

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
