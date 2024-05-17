const express = require('express')
const {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    changePassword,
    updateImage
} = require('../src/controllers/user.controller')

const route = express.Router()
const auth = require("./../auth/auth")
const { errHandler } = require('../src/exception/errHandler')
const { uploadProfile } = require('../src/midlware/uploadFile')


route.get('/', auth, getUsers)
route.get('/:id', auth, getUser)
route.post('/', auth, addUser)
route.put('/:id', auth, updateUser)
route.put('/update_password/:id', auth, changePassword)
route.delete('/:id', auth, deleteUser)
route.put('/update-profil/:id', uploadProfile.single('image'), auth, errHandler , updateImage)

module.exports = route