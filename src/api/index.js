import axios from '../utils/request'
import base from './base'
import qs from 'query-string'

const api = {
  getLogin (params) {
    console.log(base.proxyUrl + base.Login + qs.stringify(params))
    return axios.post(base.proxyUrl + base.Login, qs.stringify(params))
  },
  getFilelist (params) {
    console.log(params)
    return axios.get(base.proxyUrl + base.Queryfile, {
      // params:qs.stringify(params)
      params: params
    })
  },
  getapp(params){
    console.log(params)
    return(axios.get(base.baseUrl + base.appselect,params));
},

getsen(params){
    console.log(params)
    return(axios.get(base.baseUrl + base.Sensitives,params));
},

getfile(params){
    console.log(params)
    return(axios.get(base.baseUrl + base.FileSelect,params));
},

delsen(params){
    console.log(params)
    return(axios.post(base.baseUrl + base.DelSensitives,qs.stringify(params)));
},


delfile(params){
    console.log(params)
    return(axios.post(base.baseUrl + base.DeleFile,qs.stringify(params)));
},

delappendix(params){
    console.log(params)
    return(axios.post(base.baseUrl + base.delappendix,qs.stringify(params)));
},

addfile(params){
    console.log(params)
    return(axios.post(base.baseUrl + base.AddFile,qs.stringify(params)));
},

addappendix(params){
    console.log(params)
    return(axios.post(base.baseUrl + base.AddAppendix,qs.stringify(params)));
},

addsensitive(params){
    console.log(params)
    return(axios.post(base.baseUrl + base.AddSensitive,qs.stringify(params)));
}
}

export default api
