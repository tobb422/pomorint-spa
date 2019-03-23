import BaseApi from '~/api/base'

const endPoint = 'users'

export default class UsersApi extends BaseApi {
  // ユーザー情報取得
  show() {
    return super.get(`${endPoint}/info`)
  }

  // ユーザー情報更新
  update(params) {
    return super.put(`${endPoint}`, params)
  }
}
