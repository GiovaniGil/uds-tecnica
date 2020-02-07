import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    entidade: null
  }
}
const state = getDefaultState()

const store = new Vuex.Store({
  state,
  mutations: {
    resetState: state => {
      console.log('reset state')
      Object.assign(state, getDefaultState())
    }
  }
})
export default store
