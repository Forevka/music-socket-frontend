<template>
  <div id="app" class="mainapp">
   <!--<SideMenu/>-->
    <b-navbar class="navbar" fixed-top type="is-dark" is-transparent>
      <template slot="start">
        <b-navbar-item class="navbar-left" href="#/dashboard">Dashboard</b-navbar-item>
        <b-navbar-item class="navbar-left" href="#">Channels</b-navbar-item>
        <b-navbar-item class="navbar-left" href="#/channel/1">Channel 1</b-navbar-item>
      </template>

      <template slot="end">
        <b-navbar-item tag="div" class="navbar-right">
          <div class="buttons">
            <a class="button is-light" @click="cardModal()">Log in</a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import HTTP from './components/HTTPApi'
import Vue from 'vue'
import SideMenu from './components/SideMenu'
import Login from './components/Login'
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
    },
    cardModal () {
      this.$buefy.modal.open({
        parent: this,
        component: Login,
        hasModalCard: true,
        animation: 'fade',
        customClass: 'custom-class custom-class-2',
        canCancel: ['escape', 'outside']
      })
    }
  }
}
</script>

<style lang="scss">
html {
  overflow: hidden;
}

body {
  background-color: rgb(29, 29, 29);
  padding-top: 3.25em;
}
</style>
