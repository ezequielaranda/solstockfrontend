import Vue from 'vue'
import App from './App.vue'

import { routes } from './router'
import VueRouter from 'vue-router'
import store from './store/store'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import vSelect from 'vue-select'
import VueSession from 'vue-session'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css'
import httpClient from './services/api/httpClient'

//const token = localStorage.getItem('user-token')
//if (token) { httpClient.defaults.headers.common['Authorization'] = token }

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(VueSession)
Vue.component('v-select', vSelect)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
