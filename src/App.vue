<template>
  <div id="app" class="mainapp">
   <!--<SideMenu/>-->
    <NavBarMenu v-if="showNavBar"/>
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import HTTP from './components/HTTPApi'
import Vue from 'vue'
import SideMenu from './components/SideMenu'
import NavBarMenu from './components/NavBarMenu'
import store from './stores/index'

export default {
  name: 'App',
  components: {
    SideMenu,
    NavBarMenu
  },
  data () {
    return {
      showNavBar: true
    }
  },
  created () {
    console.log(process.env.NODE_ENV)
    console.log(process.env.URL_HTTP_BASE)
    console.log(process.env.URL_WEBSOCKET_BASE)
    console.log(this.$route.path)
    console.log('father')
    Vue.prototype.$mainApp = this
    if (localStorage.token) {
      HTTP.Instance().getMe(localStorage.token)
    }
    // HTTP.Instance().getAllChannels()
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
      /* if (localStorage.token) {
        this.sendRequest('Login', store.getters.getUser)
      } */
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
  },
  watch: {
    $route: function (newRoute, oldRoute) {
      console.log(oldRoute, newRoute)
      console.log(newRoute.name)
      if (newRoute.name === 'Channel') {
        this.showNavBar = false
      } else {
        this.showNavBar = true
      }
    }
  }
}
</script>

<style lang="scss">
html {
  overflow: hidden;
}

body {
  // background-color: rgb(29, 29, 29);
  // padding-top: 3.25em;
  // background: #141E30;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, rgb(29, 29, 29), rgb(17, 26, 43));  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, rgb(29, 29, 29), rgb(17, 26, 43)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
