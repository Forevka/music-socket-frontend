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

export default new Vuex.Store({
  state: {
    socket: {
      isConnected: false,
      message: '',
      reconnectError: false,
      role: '',
      myId: 0,
      channel: 0,
      username: '',
      password: ''
    }
  },
  mutations: {
    [SOCKET_ONOPEN] (state, event) {
      state.socket.isConnected = true
      console.log('connected', event)
      state.socket.role = 'Guest'
      if (localStorage.username && localStorage.password) {
        Vue.prototype.$socket.sendObj({'event': 'Login', 'body': {'username': localStorage.username, 'password': localStorage.password}, 'timestamp': 1})
      }
    },
    [SOCKET_ONCLOSE] (state, event) {
      state.socket.isConnected = false
      console.log('closed connection')
    },
    [SOCKET_ONERROR] (state, event) {
      console.error(state, event)
    },
    // default handler called for all methods
    [SOCKET_ONMESSAGE] (state, message) {
      state.socket.message = message
      console.log('message', message)
      if (message.event === 'Login') {
        state.socket.role = message.body.role
        state.socket.myId = message.body.user_id
        state.socket.channel = message.body.channel
        state.socket.username = message.body.user_name
        state.socket.password = message.body.password
        Vue.prototype.$awn.success('Logged as ' + state.socket.username)
      }
    },
    // mutations for reconnect methods
    [SOCKET_RECONNECT] (state, count) {
      console.log('reconnect')
      console.info(state, count)
    },
    [SOCKET_RECONNECT_ERROR] (state) {
      state.socket.reconnectError = true
      console.log('reconnect error')
    }
  }
})
