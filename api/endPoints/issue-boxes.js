import BaseApi from '~/api/base'

const endPoint = 'issue-boxes'

export default class IssueBoxesApi extends BaseApi {
  // リスト一覧取得
  index() {
    return super.get(`${endPoint}`)
  }

  // 新しいリストの作成
  create(params) {
    return super.post(`${endPoint}`, params)
  }

  // リストの編集
  update(params) {
    return super.put(`${endPoint}/${params.id}`, { name: params.name })
  }

  // リストの削除
  delete(id) {
    return super.delete(`${endPoint}/${id}`)
  }
}
