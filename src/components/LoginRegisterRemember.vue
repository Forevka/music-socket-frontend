<template>
  <div>
    <h1 align="center">{{ msg }}</h1>
    <div style="width: 300px; display: inline-block;">
      <b-field label="Username">
        <b-input v-model="username"></b-input>
      </b-field>
      <b-field label="Password">
        <b-input v-model="password"></b-input>
      </b-field>
      <b-field>
        <b-checkbox>Remember me?</b-checkbox>
        <b-button type="is-primary" v-on:click="loginHttp" style="position: absolute; right: 0;">Submit</b-button>
      </b-field>
    </div>
  </div>
</template>

<script>
import HTTP from './HTTPApi'
// import store from '../stores/index'

export default {
  data () {
    return {
      msg: 'Login',
      username: '',
      password: ''
    }
  },
  methods: {
    loginHttp: function () {
      HTTP.Instance().login(this.username, this.password)
    }
  }
}
</script>
