import axios from '../utils/request'
import base from './base'
import qs from 'query-string'
// import { Header } from 'element-ui'

// const config = {
//   headers: {
//     Authorization: localStorage.getItem('Authorization').replace(/Token /, '')
//   }
// }
const BASE_URL = window.global_config.BASE_URL;
//如需打包，则将基础路径全局替换为BASE_URL;如需开发模式，则将所有BASE_URL替换为BASE_URL

const api = {
  getLogin(params) {
    console.log(BASE_URL + base.Login + qs.stringify(params))
    return axios.post(BASE_URL + base.Login, qs.stringify(params))
  },
  getFilelist(params, headers) {
    console.log(params)
    return axios.get(BASE_URL + base.Queryfile, {
      // params:qs.stringify(params)
      params: params
    }, headers)
  },
  getapp(params) {
    console.log(params)
    return (axios.get(BASE_URL + base.appselect, params))
  },

  getsen(params) {
    console.log(params)
    return (axios.get(BASE_URL + base.Sensitives, params))
  },

  getfile(params) {
    console.log(params)
    return (axios.get(BASE_URL + base.FileSelect, params))
  },

  delsen(params) {
    console.log(params)
    return (axios.post(BASE_URL + base.DelSensitives, qs.stringify(params)))
  },

  delfile(params) {
    console.log(params)
    return (axios.post(BASE_URL + base.DeleFile, qs.stringify(params)))
  },

  delappendix(params) {
    console.log(params)
    return (axios.post(BASE_URL + base.DelAppendix, qs.stringify(params)))
  },

  addfile(params) {
    console.log(params)
    return (axios.post(BASE_URL + base.AddFile, qs.stringify(params)))
  },

  addappendix(params) {
    console.log(params)
    return (axios.post(BASE_URL + base.AddAppendix, qs.stringify(params)))
  },

  addsensitive(params) {
    console.log(params)
    return (axios.post(BASE_URL + base.AddSensitive, qs.stringify(params)))
  },

  changestate(params) {
    console.log(params)
    return (axios.post(BASE_URL + base.ChangeState, qs.stringify(params)))
  },

  selectfilebyid(params) {
    console.log(params)
    return (axios.get(BASE_URL + base.FileReader, params))
  },

  getReviewWord(params) {
    console.log(params)
    return (axios.get(BASE_URL + base.getReviewWord, params, { responseType: 'blob', }))
  },

  updateApp(params){
    console.log(params)
    return (axios.post(BASE_URL + base.UpdateAppendixtype,qs.stringify(params)))
  },

  updateSen(params){
    console.log(params)
    return (axios.post(BASE_URL + base.UpdateSensitives,qs.stringify(params)))
  }
}

export default api
