/** creation du port */
const express = require("express")
let categories = require("./data_categories")
let {
    success
} = require("./helper")

const {
    Sequelize,
    DataTypes
} = require('sequelize');

const categorieModel = require("./src/models/categorie.model")


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('portefolio', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: true
});

sequelize.authenticate()
    .then(() => console.log('connection a la base de donne reussi'))
    .catch((error) => console.log(`error survenue lors de la connection a la base de donne ==> ${error}`))

const categorie = categorieModel(sequelize, DataTypes)

sequelize.sync({force: true})
    .then(() => console.log(`la table a ete creer avec succes`))


const app = express()
const port = 3000


/** les endpoint */
app.get('/', (req, res) => res.send('hello Express on va'))
app.get('/api/categories/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const categorie = categories.find(categorie => categorie.id === id)
    res.json(success(categorie, 'categorie trouver'))
})

app.get('/api/categories', (req, res) => {
    res.json(success(categories, `les categories son ${categories.length}`))
})

/** lancement du server */
app.listen(port, () => console.log(`l'application redemer sur le port : http://localhost:${port}`))