const express = require('express')
const { getRoles, getRole, addRole, updateRole, deleteRole } = require('../src/controllers/role.controller')
const route = express.Router()

route.get('/', getRoles)
route.get('/:id', getRole)
route.post('/', addRole)
route.put('/:id', updateRole)
route.delete('/:id', deleteRole)

module.exports = route