const express = require('express')
const route = express.Router()
const auth = require("./../auth/auth")
const { getFiles, getFile, addFile, updateFile, deleteFile } = require('../src/controllers/file.controller')
const { uploadProjectFile } = require('../src/midlware/uploadFile')
const { errHandler } = require('../src/exception/errHandler')

route.post('/', auth, uploadProjectFile.single('image') , errHandler, addFile)
route.get('/:id', auth, getFile)
route.delete('/:id', auth, deleteFile)

module.exports = route