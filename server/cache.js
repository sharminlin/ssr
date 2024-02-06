const LRU = require('lru-cache')

const microCache = LRU({
  max: 100,
  maxAge: 1000 // 重要提示：条目在 1 秒后过期。
})

const isCacheable = req => {
  // 实现逻辑为，检查请求是否是用户特定(user-specific)。
  // 只有非用户特定 (non-user-specific) 页面才会缓存
}

module.exports = {
  microCache,
  isCacheable
}
