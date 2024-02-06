import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'

import { createRouter } from './router'
import { createStore } from './store'

export function createApp(context) {
  const router = createRouter(context)
  const store = createStore(context)

  sync(store, router)

  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
