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
          userid: 0,
          username: login,
          password: password,
          role: 'Member',
          token: response.data.token
        })
        Vue.prototype.$awn.success('Successfully loged')
      })
      .catch(error => { Vue.prototype.$awn.alert('Cant login ' + error) })
  }
}

export default HTTP
