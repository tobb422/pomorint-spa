import Cookies from 'universal-cookie'

export default class Session {
  constructor() {
    this._cookies = new Cookies()
  }

  get(key) {
    const session = this._cookies.get('pomorint-session')
    if (session) {
      return session[key]
    }
    return null
  }

  set(params) {
    this._cookies.set('pomorint-session', params)
  }

  remove() {
    this._cookies.remove('pomorint-session')
  }
}
