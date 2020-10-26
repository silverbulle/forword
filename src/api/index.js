import axios from '../utils/request'
import base from './base'
import qs from 'query-string'
// import { Header } from 'element-ui'

// const config = {
//   headers: {
//     Authorization: localStorage.getItem('Authorization').replace(/Token /, '')
//   }
// }
// const BASE_URL = window.global_config.BASE_URL;
//如需打包，则将基础路径全局替换为BASE_URL;如需开发模式，则将所有BASE_URL替换为BASE_URL


const api = {
  getLogin(params) {
    console.log(base.proxyUrl + base.Login + qs.stringify(params))
    return axios.post(base.proxyUrl + base.Login, qs.stringify(params))
  },
  getFilelist(params) {
    console.log(params)
    return axios.get(base.proxyUrl + base.Queryfile, {
      // params:qs.stringify(params)
      params: params
    })
  },
  getapp(params) {
    console.log(params)
    return (axios.get(base.proxyUrl + base.appselect, params))
  },

  getsen(params) {
    console.log(params)
    return (axios.get(base.proxyUrl + base.Sensitives, params))
  },

  getfile(params) {
    console.log(params)
    return (axios.get(base.proxyUrl + base.FileSelect, params))
  },

  delsen(params) {
    console.log(params)
    return (axios.post(base.proxyUrl + base.DelSensitives, qs.stringify(params)))
  },

  delfile(params) {
    console.log(params)
    return (axios.post(base.proxyUrl + base.DeleFile, qs.stringify(params)))
  },

  delappendix(params) {
    console.log(params)
    return (axios.post(base.proxyUrl + base.DelAppendix, qs.stringify(params)))
  },

  addfile(params) {
    console.log(params)
    return (axios.post(base.proxyUrl + base.AddFile, qs.stringify(params)))
  },

  addappendix(params) {
    console.log(params)
    return (axios.post(base.proxyUrl + base.AddAppendix, qs.stringify(params)))
  },

  addsensitive(params) {
    console.log(params)
    return (axios.post(base.proxyUrl + base.AddSensitive, qs.stringify(params)))
  },

  changestate(params) {
    console.log(params)
    return (axios.post(base.proxyUrl + base.ChangeState, qs.stringify(params)))
  },

  selectfilebyid(params) {
    console.log(params)
    return (axios.get(base.proxyUrl + base.FileReader, params))
  },

  getReviewWord(params) {
    console.log(params)
    return (axios.get(base.proxyUrl + base.getReviewWord, params, { responseType: 'blob', }))
  },

  updateApp(params){
    console.log(params)
    return (axios.post(base.proxyUrl + base.UpdateAppendixtype,qs.stringify(params)))
  },

  updateSen(params){
    console.log(params)
    return (axios.post(base.proxyUrl + base.UpdateSensitives,qs.stringify(params)))
  }
}

export default api
