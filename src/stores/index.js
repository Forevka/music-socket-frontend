import Vue from 'vue'
import Vuex from 'vuex'
import MenuStore from './modules/MenuStore'
import UserStore from './modules/UserStore'
import SocketStore from './modules/SocketStore'
// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    UserStore,
    MenuStore,
    SocketStore
  }
})
