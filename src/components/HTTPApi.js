import axios from 'axios'
import store from '../stores/index'

import Vue from 'vue'

class HTTP {
  _instance = null

  constructor () {
    this._http = axios.create({
      timeout: 1000,
      baseURL: 'http://127.0.0.1:443',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })
    HTTP._instance = this
  }

  static Instance () {
    if (HTTP._instance == null) {
      return new HTTP()
    }
    return HTTP._instance
  }

  login (login, password) {
    this._http.post('/authentication', {
      login: login,
      password: password
    })
      .then(response => {
        store.dispatch('change_user', {
          userid: response.data.id,
          username: response.data.login,
          avatar: response.data.img_url,
          role: this.convertRole(response.data.role),
          token: response.data.token
        })
        localStorage.token = response.data.token
        Vue.prototype.$awn.success('Successfully logged as ' + response.data.login)
      })
      .catch(error => { Vue.prototype.$awn.alert(this.parseError(error)) })
  }

  getMe (token) {
    let config = {
      headers: {
        token: token
      }
    }
    this._http.post('/methods/get_me', {asd: '1'}, config)
      .then(response => {
        store.dispatch('change_user', {
          userid: response.data.id,
          username: response.data.login,
          avatar: response.data.img_url,
          role: this.convertRole(response.data.role),
          token: localStorage.token
        })
        Vue.prototype.$awn.success('Successfully loged')
      })
      .catch(error => { Vue.prototype.$awn.alert(this.parseError(error)) })
  }

  convertRole (roleId) {
    if (roleId === 1) {
      return 'Member'
    } else {
      return 'Guest'
    }
  }

  parseError (error) {
    return error.response.data.message
  }
}

export default HTTP
