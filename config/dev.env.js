'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL_HTTP_BASE: '"http://127.0.0.1:443"',
  URL_WEBSOCKET_BASE: '"ws://localhost:5678"'
})
