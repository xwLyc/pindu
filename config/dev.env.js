'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL:  '"/api/app"',
  // URL_WEBSITE: '"https://wx.donut.cn"',

  URL_WEBSITE: '""'
})
