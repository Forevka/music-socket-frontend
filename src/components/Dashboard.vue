<template>
  <div class="login__container" v-bind:style="{'line-height': '1.4285em'}">
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

export default {
  name: 'Dashboard',
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
    },
    login: function () {
      let a = this.create_request('Login', {username: this.username, password: this.password})
      console.log(a)
      this.$socket.sendObj(a)
    },
    create_request: function (event, body = '') {
      return {event: event, body: body, timestamp: '1'}
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@mixin centerer {
  position: absolute;
  top: 50%;
  left: calc(50% + 50px);
  transform: translate(-50%, -50%);
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.login__container {
  @include centerer;
}

body {
  background-color: rgb(54, 56, 62);
}
</style>
