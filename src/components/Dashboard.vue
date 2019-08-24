<template>
  <div v-if="!isLoged" class="login__container" v-bind:style="{'line-height': '1.4285em'}">
    <LoginForm> </LoginForm>
  </div>
</template>

<script>
import HTTP from './HTTPApi'
import store from '../stores/index'
import LoginForm from './Login'

export default {
  name: 'Dashboard',
  components: {
    LoginForm
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

.login__container {
  @include centerer;
}
</style>
