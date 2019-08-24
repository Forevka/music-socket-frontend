<template>
  <div>
    <div id="formContainer" v-bind:class=classToggle>
      <div class="formLeft">
        <img
          src="https://avatars0.githubusercontent.com/u/32968153"
        />
      </div>
      <div class="formRight">
        <!-- Forgot password form -->
        <form id="forgot" v-bind:class=forgotClass>
          <header>
            <h1>Forgot Password</h1>
            <p>Seems like your password is missing</p>
          </header>
          <section>
            <label>
              <p>Email</p>
              <input type="email" placeholder=" " v-model="resetEmail"/>
              <div class="border"></div>
            </label>
            <button v-on:click="rememberPassword">Send email</button>
          </section>
          <footer>
            <button type="button" class="forgotBtn" v-on:click="activeForgot()" >Back</button>
          </footer>
        </form>

        <!-- Login form -->
        <form id="login">
          <header>
            <h1>Welcome back</h1>
            <p>Login to continue</p>
          </header>
          <section>
            <label>
              <p>Username</p>
              <input type="text" v-model="username" placeholder=" " />
              <div class="border"></div>
            </label>
            <label>
              <p>Password</p>
              <input type="password" v-model="password" placeholder=" " />
              <div class="border"></div>
            </label>
            <button v-on:click="loginHttp">Login</button>
          </section>
          <footer>
            <button type="button" class="forgotBtn" v-on:click="activeForgot()">Forgot password?</button>
            <button type="button" class="registerBtn" v-on:click="activeRegister()">Need an account?</button>
          </footer>
        </form>

        <!-- Register form -->
        <form id="register" v-bind:class=registerClass>
          <header>
            <h1>Forgot Password</h1>
            <p>Register to gain full access</p>
          </header>
          <section>
            <label>
              <p>Username</p>
              <input type="text" placeholder=" " v-model="registerUsername"/>
              <div class="border"></div>
            </label>
            <label>
              <p>Email</p>
              <input type="email" placeholder=" " v-model="registerEmail"/>
              <div class="border"></div>
            </label>
            <label>
              <p>Password</p>
              <input type="password" placeholder=" " v-model="registerPassword"/>
              <div class="border"></div>
            </label>
            <label>
              <p>Repeat Password</p>
              <input type="password" placeholder=" " v-model="registerPasswordRepeat"/>
              <div class="border"></div>
            </label>
            <button v-on:click="registerUser">Send email</button>
          </section>
          <footer>
            <button type="button" class="registerBtn" v-on:click="activeRegister()">Back</button>
          </footer>
        </form>
      </div>
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
      password: '',
      resetEmail: '',
      registerEmail: '',
      registerUsername: '',
      registerPassword: '',
      registerPasswordRepeat: '',
      forgotForm: false,
      loginForm: true,
      registerForm: false,
      classToggle: '',
      classClose: 'otherForm',
      classOpen: 'otherForm toggle',
      forgotClass: 'otherForm',
      registerClass: 'otherForm'
    }
  },
  methods: {
    loginHttp: function () {
      HTTP.Instance().login(this.username, this.password)
    },
    activeForgot: function () {
      this.forgotForm = !this.forgotForm
      if (this.forgotForm === true) {
        this.forgotClass = this.classOpen
      } else {
        this.forgotClass = this.classClose
      }
    },
    activeRegister: function () {
      this.registerForm = !this.registerForm
      if (this.registerForm === true) {
        this.classToggle = 'toggle'
        this.registerClass = this.classOpen
      } else {
        this.classToggle = ''
        this.registerClass = this.classClose
      }
    },
    rememberPassword: function () {
      this.$awn.success('will send reset pass to ' + this.resetEmail)
    },
    registerUser: function () {
      this.$awn.success('register ' + this.registerUsername + ' ' + this.registerEmail + ' ' + this.registerPassword)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css?family=Nunito:300,400,600,700,800');

* {
  outline-width: 0;
  font-family: 'Nunito' !important;
}

// Background Image will change daily.
$image: 'https://steamuserimages-a.akamaihd.net/ugc/877502531190315829/DC8B5FBEE27CD55844D6432326989D0D85152228/';
$image-left: 'https://i.pinimg.com/736x/1d/84/85/1d8485beb8e890364d29192c948d69f4.jpg';
$image-forgot: 'https://media.giphy.com/media/xT9IglBTX4JAsRHH9K/giphy.gif';

// Colour of buttons
$main: #e400f7;

body {
  height: 100vh;
  width: 100vw;
  background: url($image);
  display: flex;
  justify-content: center;
  align-items: center;
}

#formContainer {
  display: flex;
  transition: 0.2s ease;
  height: 342.5px;
  transition-delay: 0.3s;

  &.toggle {
    height: 480px;
    transition-delay: 0s;
  }
}

.formLeft {
  background: url($image-left);
  background-size: auto;
  border-radius: 5px 0 0 5px;
  padding: 0 35px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  img {
    display: block;
    width: 72px;
    border-radius: 50%;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
  }
}

.formRight {
  position: relative;
  overflow: hidden;
  border-radius: 0 5px 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:before {
    content: "";
    position: absolute;
    top: -10px;
    left: -10px;
    width: calc(100% + 20px);
    height: calc(100% + 20px);
    background: url($image);
    background-position: center;
    background-size: 150% 150%;
    box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.5);
    filter: blur(5px);
  }

  form {
    position: relative;
    width: 350px;
    padding: 25px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;

    header {
      color: #fff;
      text-align: center;
      margin-bottom: 15px;

      h1 {
        margin: 0;
        font-weight: 400;
        user-select: none;
      }

      p {
        margin: 5px 0 0;
        opacity: 0.5;
        font-size: 14px;
        user-select: none;
      }
    }

    section {
      label {
        display: block;
        margin-bottom: 15px;
        position: relative;

        p {
          color: #fff;
          margin: 0 0 10px 0;
          font-weight: 600;
          font-size: 12px;
          opacity: 0.5;
          user-select: none;
        }

        input {
          width: 100%;
          display: block;
          border: none;
          background: transparent;
          color: #fff;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0 0 10px;
          box-sizing: border-box;
          font-weight: 600;

          &:focus~.border {
            transform: scale(1, 1);
          }

          &:not(:placeholder-shown)~.border {
            transform: scale(1, 1);
          }
        }

        .border {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: #2e9598;
          transform: scale(0, 1);
          transition: 0.2s ease;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      button {
        background: $main;
        border: none;
        width: 100%;
        padding: 10px 0;
        font-weight: 600;
        color: #fff;
        cursor: pointer;

        &:hover {
          background: darken($main, 2%);
        }
      }
    }

    footer {
      margin-top: 15px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      padding-top: 15px;
      display: flex;

      button {
        background: transparent;
        padding: 0;
        border: none;
        color: #fff;
        cursor: pointer;
        font-size: 12px;
        font-weight: bold;
        flex: 1;
        opacity: .5;

        &:hover {
          opacity: 1;
        }
      }
    }

    &.otherForm {
      top: 0;
      left: 0;
      position: absolute;
      background: url($image-forgot);
      background-position: center;
      background-size: 100% 100%;
      height: 100%;
      z-index: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 0;
      padding: 25px 0;
      transition: 0.2s ease;
      transition-delay: .2s;
      border-left: 1px solid rgba(0, 0, 0, 0.1);

      header {
        color: #fff;
        opacity: 0;
        transition: 0.2s ease;
        transition-delay: 0s;
      }

      p {
        color: #fff;
      }

      section {
        opacity: 0;
        transition: 0.2s ease;
        transition-delay: 0s;
      }

      footer {
        border-top-color: rgba(0, 0, 0, 0.1);
        opacity: 0;

        button {
          color: #fff;
        }
      }

      input {
        border-color: #fff;
        color: #fff;
      }

      .border {
        background: #2e9598;
      }

      &.toggle {
        width: 100%;
        padding: 25px;
        transition-delay: 0s;

        header,
        section,
        footer {
          opacity: 1;
          transition-delay: 0.3s;
        }
      }
    }
  }
}
</style>
