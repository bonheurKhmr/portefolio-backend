const express = require('express')
const { getRoles, getRole, addRole, updateRole, deleteRole } = require('../src/controllers/role.controller')
const route = express.Router()
const auth = require("./../auth/auth")

route.get('/', auth, getRoles)
route.get('/:id', auth, getRole)
route.post('/', auth, addRole)
route.put('/:id', auth, updateRole)
route.delete('/:id', auth, deleteRole)

module.exports = route