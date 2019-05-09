import { successHandler, errorHandler } from '~/api/api-handler'
import { camelizeKeys } from 'humps'
import axios from 'axios'
import Session from '~/plugins/session'

// API クラスのベースクラス
export default class BaseApi {
  constructor() {
    this._axios = () => {
      const token = Session.get('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      return axios.create({
        baseURL: 'http://localhost:3001/',
        withCredentials: false,
        headers: headers
      })
    }
  }

  get(endPoint, params = {}) {
    return new Promise((resolve, reject) => {
      return this._axios()
        .get(endPoint, { params: params })
        .then(res => successHandler(camelizeKeys(res.data), resolve))
        .catch(e => errorHandler(e, reject))
    })
  }

  post(endPoint, params) {
    return new Promise((resolve, reject) => {
      return this._axios()
        .post(endPoint, params)
        .then(res => successHandler(camelizeKeys(res.data), resolve))
        .catch(e => errorHandler(e, reject))
    })
  }

  put(endPoint, params) {
    return new Promise((resolve, reject) => {
      return this._axios()
        .put(endPoint, params)
        .then(res => successHandler(camelizeKeys(res.data), resolve))
        .catch(e => errorHandler(e, reject))
    })
  }

  delete(endPoint, params = {}) {
    return new Promise((resolve, reject) => {
      return this._axios()
        .delete(endPoint, { params: params })
        .then(res => successHandler(camelizeKeys(res.data), resolve))
        .catch(e => errorHandler(e, reject))
    })
  }
}
