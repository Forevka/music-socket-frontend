<template>
  <div v-if="!isLoged" class="login__container" v-bind:style="{'line-height': '1.4285em'}">
    <LoginRegisterRemember> </LoginRegisterRemember>
  </div>
</template>

<script>
import HTTP from './HTTPApi'
import store from '../stores/index'
import LoginRegisterRemember from './LoginRegisterRemember'

export default {
  name: 'Dashboard',
  components: {
    LoginRegisterRemember
  },
  data () {
    return {
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
  },
  computed: {
    isLoged () {
      return store.getters.getUser.role !== 'Guest'
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
