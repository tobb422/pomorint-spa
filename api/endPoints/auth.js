import BaseApi from '~/api/base'

const endPoint = 'auth'

export default class AuthApi extends BaseApi {
  // 新規登録
  signup(params) {
    return super.post(`${endPoint}/signup`, params)
  }

  // ログイン
  login(params) {
    return super.post(`${endPoint}/login`, params)
  }
}
