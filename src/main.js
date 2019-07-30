// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueNativeSock from 'vue-native-websocket'
import Vuex from 'vuex'
import FishUI from 'fish-ui'

Vue.config.productionTip = false

Vue.use(FishUI)
Vue.use(Vuex)
Vue.use(VueNativeSock, 'ws://localhost:5678', {
  format: 'json'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
