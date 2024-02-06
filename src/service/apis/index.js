export function fetchItemApi(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(id + '-' + Date.now())
    }, 3000)
  })
}
