import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = () => import('../pages/home/index.vue')
const Item = () => import('../pages/Item/index.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'home',
        component: Home
      },
      {
        path: '/item/:id',
        name: 'item',
        component: Item
      },
    ]
  })
}