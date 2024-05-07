const express = require('express')
const { login } = require('../src/controllers/auth/login.controller')
const route = express.Router()

route.post('/', login)

module.exports = route