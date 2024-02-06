<template>
  <div>
    <p>Item, {{ item }}</p>
    <CacheKey :cache-key="$route.params.id"></CacheKey>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CacheKey from './CacheKey/index.vue'

export default {
  name: 'Home',
  components: { CacheKey },
  asyncData ({ store, route }) {
    // 触发 action 后，会返回 Promise
    return store.dispatch('item/fetchItemAction', route.params.id)
  },
  computed: {
    ...mapState('item', ['items']),
    // 从 store 的 state 对象中的获取 item。
    item () {
      return this.items[this.$route.params.id]
    }
  }
}
</script>
