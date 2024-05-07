const express = require('express')
const {
    getCategories,
    getCategorie,
    addCategorie,
    updateCategorie,
    deleteCategorie
} = require('../src/controllers/categorie.controller')
const route = express.Router()

route.get('/', getCategories)
route.get('/:id', getCategorie)
route.post('/', addCategorie)
route.put('/:id', updateCategorie)
route.delete('/:id', deleteCategorie)

module.exports = route