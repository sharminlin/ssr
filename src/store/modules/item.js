import Vue from 'vue'
import { fetchItemApi } from '../../service/apis'

export default {
  namespaced: true,
  state: {
    items: {}
  },
  actions: {
    async fetchItemAction({ commit }, id) {
      const item = await fetchItemApi(id)
      commit('setItem', { id, item })
    }
  },
  mutations: {
    setItem(state, { id, item }) {
      Vue.set(state.items, id, item)
    }
  },
}