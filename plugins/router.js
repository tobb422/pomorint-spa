import Session from '~/plugins/session'

export default ({ app }) => {
  if (!app.store.state.user.email) app.store.dispatch('user/setUser')

  const Unauthorization = [
    '/sign-in',
    '/sign-up',
    '/auth/callback',
    '/auth/callback/'
  ]
  const unauthorizationPath = to => Unauthorization.some(path => path === to)
  app.router.beforeEach((to, from, next) => {
    if (unauthorizationPath(to.path)) {
      next()
    } else {
      if (Session.get('token')) {
        next()
      } else {
        next('/sign-in')
        app.store.dispatch('toast/error', { message: 'ログインしてください' })
      }
    }
  })
}
