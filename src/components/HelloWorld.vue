<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <fish-form style="width: 300px; display: inline-block;">
      <fish-field label="Username">
        <fish-input v-model="username"></fish-input>
      </fish-field>
      <fish-field label="Password">
        <fish-input v-model="password"></fish-input>
      </fish-field>
      <fish-field>
        <fish-checkbox index="yes">Remember me?</fish-checkbox>
      </fish-field>
      <fish-button type="primary" v-on:click="login">Submit</fish-button>
    </fish-form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Login to Websocket server',
      username: '',
      password: ''
    }
  },
  methods: {
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
<style scoped>
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
</style>
