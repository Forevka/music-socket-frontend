<template>
  <div id="app">
    <SideMenu/>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import SideMenu from './components/SideMenu'

export default {
  name: 'App',
  components: {
    SideMenu
  },
  data () {
    return {
      current_user: {
        avatar: 'https://ui-avatars.com/api/?name=Unnamed&size=128&background=b0a0a1',
        username: '',
        password: '',
        socketStore: null,
        role: 'Guest',
        userid: -1
      },
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
    Vue.prototype.$mainApp = this
  },
  mounted () {
    Vue.prototype.$mainApp = this
    // this.loginHttp('volodia', '000000')
    if (localStorage.user_name && localStorage.password) {
      this.current_user.user_name = localStorage.user_name
      this.current_user.password = localStorage.password
    }
  },
  methods: {
    isThisChannelExist: function (channelId) {
      let chId = channelId
      return this.available_channels.filter(function (u) {
        return u.id === chId
      })
    },
    sendRequest: function (event, body = {}) {
      return Vue.prototype.$socket.sendObj({'event': event, 'body': body, 'timestamp': this.$moment().unix()})
    },
    onLogin: function (state, event, message) {
      this.current_user.role = message.body.role
      this.current_user.user_id = message.body.user_id
      this.current_user.channel = message.body.channel
      this.current_user.user_name = message.body.user_name
      this.current_user.password = message.body.password
    },
    onError: function (state, event) {
      console.log('on error app')
    },
    onOpen: function (state, event) {
      console.log('on open app')
      if (localStorage.user_name && localStorage.password) {
        this.sendRequest('Login', {
          'username': localStorage.user_name,
          'password': localStorage.password
        })
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
