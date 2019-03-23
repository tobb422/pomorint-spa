import BaseApi from '~/api/base'

const endPoint = 'labels'

export default class LabelsApi extends BaseApi {
  create(params) {
    return super.post(`${endPoint}`, params)
  }
}
