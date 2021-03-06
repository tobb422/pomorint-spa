import BaseApi from '~/api/base'

const endPoint = 'labels'

export default class LabelsApi extends BaseApi {
  // ラベル一覧取得
  index() {
    return super.get(`${endPoint}`)
  }

  // 新しいラベルの作成
  create(params) {
    return super.post(`${endPoint}`, params)
  }

  // ラベルの編集
  update(params) {
    return super.put(`${endPoint}/${params.id}`, { name: params.name })
  }

  // ラベルの削除
  delete(id) {
    return super.delete(`${endPoint}/${id}`)
  }
}
