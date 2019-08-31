<template>
  <b-dropdown aria-role="menu" v-if="isLoged" hoverable>
    <a class="navbar-item" slot="trigger">
      <img :src="currentUser.avatar" />
      <b-icon pack="fas" icon="angle-down"></b-icon>
    </a>
    <b-dropdown-item custom aria-role="menuitem">
      Logged as
      <b>{{ currentUser.username }}</b>
    </b-dropdown-item>
    <hr class="dropdown-divider" aria-role="menuitem" />
    <b-dropdown-item href="#/dashboard" value="settings">
      <b-icon pack="fas" icon="cog"></b-icon> Dashboard
    </b-dropdown-item>
    <b-dropdown-item href="#/channels" value="settings">
      <b-icon pack="fas" icon="bullhorn"></b-icon> Channels
    </b-dropdown-item>
    <b-dropdown-item @click="Logout()" value="logout" aria-role="menuitem">
      <b-icon pack="fas" icon="sign-out-alt"></b-icon> Logout
    </b-dropdown-item>
  </b-dropdown>
  <div class="buttons" v-else>
    <a class="button is-light" @click="cardModal()">Log in</a>
  </div>
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
