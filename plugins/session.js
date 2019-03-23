import Cookies from 'universal-cookie'

export default class Session {
  static _cookies() {
    return new Cookies()
  }

  static get(key) {
    const session = this._cookies().get('pomorint-session')
    return session ? session[key] : null
  }

  static set(params) {
    this._cookies().set('pomorint-session', params)
  }

  static remove() {
    this._cookies().remove('pomorint-session')
  }
}
