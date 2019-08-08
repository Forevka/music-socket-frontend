<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous">
    <SideMenu/>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import SideMenu from './components/SideMenu'

Vue.component('user-message-template', {
  props: ['message', 'my_id'],
  template: '<div class="user-message-wrapper" :data-user-id="message.user_id">' +
  '<div class="user-image-wrapper">' +
  '<div :style="{\'background-image\': \'url(\' + message.user_img + \')\'}"></div>' +
  '</div>' +
  '<div class="user-message-content">' +
  '<div class="message-info">' +
  '<span class="user-name">{{ message.user_name }} <span class="user-name-you">{{message.user_id === my_id ? "You" : ""}} </span></span>' +
  '<span class="timestamp">{{ message.timestamp }}</span>' +
  '</div>' +
  '<div class="user-messages">' +
  '<span v-for="(user_message, index) in message.user_messages">{{ user_message }}  </span>' +
  '<span class="user-role" > {{ message.role === "admin" ? "Admin" : "" }} </span>' +
  '</div>' +
  '</div>' +
  '</div>'
})

export default {
  name: 'App',
  components: {
    SideMenu
  },
  data () {
    return {
      username: '',
      password: '',
      socketStore: null,
      role: 'Guest',
      myId: 0,
      channel: 0
    }
  },
  mounted () {
    Vue.prototype.$mainApp = this
    if (localStorage.username && localStorage.password) {
      this.username = localStorage.username
      this.password = localStorage.password
    }
  },
  methods: {
    createRequest: function (event, body = {}) {
      return {'event': event, 'body': body, 'timestamp': this.$moment().unix()}
    },
    onLogin: function (state, event, message) {
      this.role = message.body.role
      this.myId = message.body.user_id
      this.channel = message.body.channel
      this.username = message.body.user_name
      this.password = message.body.password
    },
    onError: function (state, event) {
      console.log('on error app')
    },
    onOpen: function (state, event) {
      console.log('on open app')
      if (localStorage.username && localStorage.password) {
        Vue.prototype.$socket.sendObj(
          this.createRequest('Login', {
            'username': localStorage.username,
            'password': localStorage.password
          })
        )
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
