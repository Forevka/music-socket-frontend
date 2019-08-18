import axios from 'axios'

const HTTP = axios.create({
  timeout: 1000,
  baseURL: 'http://127.0.0.1:443',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json'
  }
})

export default HTTP
