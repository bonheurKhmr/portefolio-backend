const express = require('express')
const { getUsers, getUser, addUser, updateUser, deleteUser, changePassword } = require('../src/controllers/user.controller')
const route = express.Router()
const auth = require("./../auth/auth")

route.get('/', auth, getUsers)
route.get('/:id', auth, getUser)
route.post('/', auth, addUser)
route.put('/:id', auth, updateUser)
route.put('/changer_mdp/:id', auth, changePassword)
route.delete('/:id', auth, deleteUser)

module.exports = route