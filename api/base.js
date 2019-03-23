import { successHandler, errorHandler } from '~/api/api-handler'
import { camelizeKeys, decamelizeKeys } from 'humps'
import axios from 'axios'
import Session from '~/plugins/session'

// API クラスのベースクラス
export default class BaseApi {
  constructor() {
    this._axios = () => {
      const token = Session.get('token')
      console.log(token)
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      return axios.create({
        baseURL: 'http://localhost:3001/',
        withCredentials: false,
        headers: headers
      })
    }
  }

  async get(endPoint, params = {}) {
    return new Promise((resolve, reject) => {
      return this._axios()
        .get(endPoint, { params: decamelizeKeys(params) })
        .then(res => successHandler(camelizeKeys(res.data), resolve))
        .catch(e => errorHandler(e, reject))
    })
  }

  post(endPoint, params) {
    return new Promise((resolve, reject) => {
      return this._axios()
        .post(endPoint, decamelizeKeys(params))
        .then(res => successHandler(camelizeKeys(res.data), resolve))
        .catch(e => errorHandler(e, reject))
    })
  }

  delete(endPoint, params = {}) {
    return new Promise((resolve, reject) => {
      return this._axios()
        .delete(endPoint, { params: decamelizeKeys(params) })
        .then(res => successHandler(camelizeKeys(res.data), resolve))
        .catch(e => errorHandler(e, reject))
    })
  }
}
