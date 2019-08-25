// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueNativeSock from 'vue-native-websocket'
import Vuex from 'vuex'
import FishUI from 'fish-ui'

import VueSidebarMenu from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'
// import MenuStore from './stores/modules/MenuStore'
import store from './stores/index'
import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
} from './stores/modules/SocketMutationTypes'
import VueAWN from 'vue-awesome-notifications'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import VAnimateCss from 'v-animate-css'

require('vue-awesome-notifications/dist/styles/style.css')

const SocketMutations = {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
}

Vue.config.productionTip = false

Vue.use(VAnimateCss)
Vue.use(Buefy)
Vue.use(VueAWN)
Vue.use(FishUI)
Vue.use(Vuex)
Vue.use(VueSidebarMenu)
Vue.use(VueMoment, {
  moment
})
Vue.use(VueNativeSock, 'ws://localhost:5678', {
  connectManually: true,
  format: 'json',
  store: store,
  mutations: SocketMutations
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: { store },
  components: { App },
  template: '<App/>'
})
// console.log(a)
// a.$connect()
