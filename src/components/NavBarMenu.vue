<template>
  <b-navbar class="navbar" fixed-top type="is-dark" is-transparent v-if="!isLoged">
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
  <b-navbar class="navbar" fixed-top type="is-dark" is-transparent v-else>
    <template slot="start">
      <b-navbar-item class="navbar-left" href="#/dashboard">Dashboard</b-navbar-item>
      <b-navbar-item class="navbar-left" href="#">Channels</b-navbar-item>
      <b-navbar-item class="navbar-left" href="#/channel/1">Channel 1</b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div" class="navbar-right">
        <b-dropdown v-model="navigation" position="is-bottom-left" aria-role="menu">
          <a class="navbar-item" slot="trigger">
            <img :src="currentUser.avatar" />
            <b-icon pack="fas" icon="angle-down"></b-icon>
          </a>

          <b-dropdown-item custom aria-role="menuitem">
            Logged as
            <b>{{ currentUser.username }}</b>
          </b-dropdown-item>
          <hr class="dropdown-divider" aria-role="menuitem" />
          <b-dropdown-item value="settings">
            <b-icon pack="fas" icon="cog"></b-icon>
            Settings
          </b-dropdown-item>
          <b-dropdown-item @click="Logout()" value="logout" aria-role="menuitem">
            <b-icon pack="fas" icon="sign-out-alt"></b-icon> Logout
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import Login from './Login'
import store from '../stores/index'

export default {
  data () {
    return {}
  },
  methods: {
    cardModal () {
      this.$buefy.modal.open({
        parent: this,
        component: Login,
        props: {
          'isModal': true
        },
        hasModalCard: true,
        animation: 'fade',
        customClass: 'custom-class custom-class-2',
        canCancel: ['escape', 'outside']
      })
    },
    Logout () {
      store.dispatch('change_user', {
        userid: -1,
        username: '',
        avatar: '',
        role: 'Guest',
        token: ''
      })
      localStorage.removeItem('token')
      this.$awn.success('Logged out')
    }
  },
  computed: {
    isLoged () {
      return store.getters.getUser.role !== 'Guest'
    },
    currentUser: function () {
      return store.getters.getUser
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
