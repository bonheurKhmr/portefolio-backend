const express = require('express')
const route = express.Router()
const auth = require("./../auth/auth")
const { getStatus, getStatu, addStatu, updateStatu, deleteStatu } = require('../src/controllers/status.controller')

route.get('/', auth, getStatus)
route.get('/:id', auth, getStatu)
route.post('/', auth, addStatu)
route.put('/:id', auth, updateStatu)
route.delete('/:id', auth, deleteStatu)

module.exports = route