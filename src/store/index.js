import Vue from 'vue'
import Vuex from 'vuex'

import item from './modules/item'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    modules: {
      item
    }
  })
}