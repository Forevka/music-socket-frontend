<template>
  <div id="app">
    <SideMenu/>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import HTTP from './components/HTTPApi'
import Vue from 'vue'
import SideMenu from './components/SideMenu'
import store from './stores/index'

export default {
  name: 'App',
  components: {
    SideMenu
  },
  data () {
    return {
      available_channels: [
        {
          id: 0,
          name: 'Default channel',
          user_amount: 2
        }
      ]
    }
  },
  created () {
    console.log('father')
    Vue.prototype.$mainApp = this
    if (localStorage.token) {
      HTTP.Instance().getMe(localStorage.token)
    }
    HTTP.Instance().getAllChannels()
  },
  mounted () {
    Vue.prototype.$mainApp = this
    // this.loginHttp('volodia', '000000')
  },
  methods: {
    sendRequest: function (event, body = {}) {
      return Vue.prototype.$socket.sendObj({'event': event, 'token': store.getters.getUser.token, 'body': body, 'timestamp': this.$moment().unix()})
    },
    onLogin: function (state, event, message) {
      console.log(event.body)
    },
    onError: function (state, event) {
      console.log('on error app')
    },
    onOpen: function (state, event) {
      console.log('on open app')
      if (localStorage.token) {
        this.sendRequest('Login', store.getters.getUser)
      }
    },
    onClose: function (state, event) {
      console.log('on close app')
    },
    onReconnect: function (state, event) {
      console.log('on reconnect app')
    },
    onReconnectError: function (state, event) {
      console.log('on reconnect error app')
    }
  }
}
</script>

<style>
body {
  background-color: rgb(29, 29, 29);
}
</style>
