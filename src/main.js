import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import cache from './services/cache'
import api from './services/api'
import { format } from 'date-fns'
import BootstrapVue from 'bootstrap-vue'
import config from './config'
import Lightbox from 'vue-my-photos'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.component('lightbox', Lightbox);

Vue.config.productionTip = false

Vue.prototype.$cache = new cache(window.localStorage);
Vue.prototype.$session = new cache(window.sessionStorage);
Vue.prototype.$api = api;
Vue.prototype.$dfns = format;
Vue.prototype.$config = config;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
