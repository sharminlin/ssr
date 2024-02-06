<template>
  <div>Cache {{ now }}</div>
</template>

<script>
export default {
  name: 'Cache',
  serverCacheKey: (props) => props.cacheKey,
  props: {
    cacheKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      now: Date.now()
    }
  },
}
</script>

<!-- <style lang="scss" scoped src="./index.scss"></style> -->
