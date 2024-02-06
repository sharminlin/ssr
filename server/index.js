const fs = require('fs')
const path = require('path')
const LRU = require('lru-cache')
const express = require('express')
const server = express()
const { createBundleRenderer } = require('vue-server-renderer')
const { microCache, isCacheable } = require('./cache')

const template = fs.readFileSync(path.join(process.cwd(), '/public/index.template.html'), 'utf-8')
const serverBundle = require(path.join(process.cwd(), '/dist/vue-ssr-server-bundle.json'))
const clientManifest = require(path.join(process.cwd(), '/dist/vue-ssr-client-manifest.json'))

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
  cache: LRU({
    max: 100,
    maxAge: 10000
  })
})

server.use('/dist', express.static(path.join(process.cwd(), '/dist')))

server.get('*', async (req, res) => {
  const cacheable = isCacheable(req)
  if (cacheable) {
    const hit = microCache.get(req.url)
    if (hit) {
      return res.end(hit)
    }
  }

  const context = {
    req,
    res,
    title: 'vue ssr',
    meta: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      console.error('render error: ', err)
      if (err.code === 404) {
        res.status(404).end('Page not found')
      } else {
        res.status(500).end('Internal Server Error')
      }
    } else {
      res.end(html)
      if (cacheable) {
        microCache.set(req.url, html)
      }
    }
  })
})

const port = 8081

server.listen(port, () => {
  console.info(`server started at http://localhost:${port}`)
})