import Cookies from 'universal-cookie'

export default class Session {
  static SessionName = 'pomorint-session'
  static _cookies() {
    return new Cookies()
  }

  static get(key) {
    const session = this._cookies().get(this.SessionName)
    return session ? session[key] : null
  }

  static set(params) {
    this._cookies().set(this.SessionName, params, { path: '/' })
  }

  static remove() {
    this._cookies().remove(this.SessionName)
  }
}
