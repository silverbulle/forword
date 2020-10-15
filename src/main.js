import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './plugins/element.js'
import vueConfig from '../vue.config'
import api from './api'
import TextHighlight from 'vue-text-highlight'
import './utils/flexible'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.component('text-highlight',TextHighlight)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
