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
import MenuStore from './stores/MenuStore'

Vue.config.productionTip = false

Vue.use(FishUI)
Vue.use(Vuex)
Vue.use(VueSidebarMenu)
Vue.use(VueNativeSock, 'ws://localhost:5678', {
  format: 'json'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: { MenuStore },
  components: { App },
  template: '<App/>'
})
