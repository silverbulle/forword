import axios from '../utils/request'
import base from './base'
import qs from 'query-string'

const api = {
  getLogin (params) {
    // console.log(params)
    return axios.post(base.proxyUrl + base.Login, qs.stringify(params))
  },
  getFilelist (params) {
    console.log(params)
    return axios.get(base.proxyUrl + base.Queryfile, {
      // params:qs.stringify(params)
      params: params
    })
  }
}

export default api
