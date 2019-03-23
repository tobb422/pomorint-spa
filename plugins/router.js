import Session from '~/plugins/session'

const session = new Session()

export default ({ app }) => {
  const Unauthorization = ['/sign-in', '/sign-up', '/auth/callback']
  const unauthorizationPath = to => Unauthorization.some(path => path === to)
  app.router.beforeEach((to, from, next) => {
    if (unauthorizationPath(to.path)) {
      next()
    } else {
      if (session.get('token')) {
        next()
      } else {
        next('/sign-in')
        app.store.dispatch('toast/error', { message: 'ログインしてください' })
      }
    }
  })
}
