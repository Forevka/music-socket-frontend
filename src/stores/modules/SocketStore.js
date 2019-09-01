// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import {
  SOCKET_ONOPEN,
  SOCKET_ONCLOSE,
  SOCKET_ONERROR,
  SOCKET_ONMESSAGE,
  SOCKET_RECONNECT,
  SOCKET_RECONNECT_ERROR
} from './SocketMutationTypes'
// import { stat } from 'fs'

Vue.use(Vuex)

const myPlugin = store => {
  // called when the store is initialized
  Vue.prototype.$socketStore = store
}

export default {
  plugins: [myPlugin],
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false
    }
  },
  mutations: {
    [SOCKET_ONOPEN] (state, event) {
      state.socket.isConnected = true
      console.log('connected', event)
      Vue.prototype.$mainApp.onOpen(state, event)
      Vue.prototype.$channel.onSocketOpen(state, event)
    },
    [SOCKET_ONCLOSE] (state, event) {
      state.socket.isConnected = false
      console.log('closed connection on socket store')
      Vue.prototype.$mainApp.onClose(state, event)
    },
    [SOCKET_ONERROR] (state, event) {
      console.log('on error on socket store')
      console.error(state, event)
      Vue.prototype.$mainApp.onError(state, event)
    },
    // default handler called for all methods
    [SOCKET_ONMESSAGE] (state, message) {
      state.socket.message = message
      console.log('message on socket store', message)
      if (message.event === 'Login') {
        Vue.prototype.$channel.onLogin(this, message)
      } else if (message.event === 'ChatMessage') {
        Vue.prototype.$channel.insertPost(this, message)
      } else if (message.event === 'ChannelUser') {
        Vue.prototype.$channel.addUser(this, message)
      } else if (message.event === 'ChangeStatus') {
        Vue.prototype.$channel.onChangeStatus(this, message)
      } else if (message.event === 'UserList') {
        Vue.prototype.$channel.onUserList(this, message)
      } else if (message.event === 'DeleteUserList') {
        Vue.prototype.$channel.deleteUserList(this, message)
      } else if (message.event === 'MessageListHistory') {
        Vue.prototype.$channel.onMessageListHistory(this, message)
      }
    },
    // mutations for reconnect methods
    [SOCKET_RECONNECT] (state, count) {
      console.info(state, count)
      console.log('reconnect on socket store')
      Vue.prototype.$mainApp.onReconnect(state, count)
    },
    [SOCKET_RECONNECT_ERROR] (state) {
      state.socket.reconnectError = true
      console.log('reconnect error on socket store')
      Vue.prototype.$mainApp.onReconnectError(state)
    }
  }
}
