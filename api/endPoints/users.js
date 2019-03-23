import BaseApi from '~/api/base'

const endPoint = 'users'

export default class UsersApi extends BaseApi {
  // ユーザー情報取得
  show() {
    return super.get(`${endPoint}/info`)
  }

  update(params) {
    return super.put(`${endPoint}`, params)
  }
}
