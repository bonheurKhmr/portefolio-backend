const express = require('express')
const {
    getCategories,
    getCategorie,
    addCategorie,
    updateCategorie,
    deleteCategorie
} = require('../src/controllers/categorie.controller')
const route = express.Router()
const auth = require("./../auth/auth")

route.get('/', auth, getCategories)
route.get('/:id', auth, getCategorie)
route.post('/', auth, addCategorie)
route.put('/:id', auth,  updateCategorie)
route.delete('/:id', auth, deleteCategorie)

module.exports = route