const express = require('express')
const route = express.Router()
const auth = require("./../auth/auth")
const { getProjets, getProjet, updateProjet, addProjet, deleteProjet } = require('../src/controllers/projet.controller')

route.get('/', auth, getProjets)
route.get('/:id', auth, getProjet)
route.post('/', auth, addProjet)
route.put('/:id', auth, updateProjet)
route.delete('/:id', auth, deleteProjet)

module.exports = route