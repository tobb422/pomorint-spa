import BaseApi from '~/api/base'

const endPoint = 'issues'

export default class IssuesApi extends BaseApi {
  // イシュー一覧取得
  index() {
    return super.get(`${endPoint}`)
  }

  // 新しいイシューの作成
  create(params) {
    return super.post(`${endPoint}`, params)
  }

  // イシューの編集
  update(params) {
    return super.put(`${endPoint}/${params.id}`, params)
  }

  // イシューの削除
  delete(id) {
    return super.delete(`${endPoint}/${id}`)
  }
}
