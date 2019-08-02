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
import SideMenu from './components/SideMenu'

export default {
  name: 'App',
  components: {
    SideMenu
  },
  data () {
    return {
      username: '',
      password: '',
      logged: false
    }
  },
  mounted () {
    if (localStorage.username && localStorage.password) {
      this.username = localStorage.username
      this.password = localStorage.password
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
