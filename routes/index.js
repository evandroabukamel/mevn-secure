module.exports = function(app) {
  const routes = [
    { path: '/book', router: require('./book') },
  ]

  routes.forEach(function (element, index) {
    app.use(element.path, element.router)
  })
}