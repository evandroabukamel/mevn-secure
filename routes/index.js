module.exports = function(app) {
  const routes = [
    { path: '/book', router: require('./book') },
    { path: '/api/auth', router: require('./auth') },
  ]

  routes.forEach(function (element, index) {
    app.use(element.path, element.router)
  })
}