/** creation du port */
const express = require("express")
const sequelize = require("./src/db/sequelize")
const categorieRoute = require("./routes/categorie.route")
const roleRoute = require("./routes/role.route")
const statusRoute = require("./routes/status.route")
const userRoute = require("./routes/user.route")
const projetRoute = require("./routes/projet.route")
const loginRoute = require("./routes/login.route")

const app = express()
const port = 3000

/** midlware */
app.use(express.json())
app.use(express.urlencoded({extended: false}))

sequelize.initDB()

/** point de terminaison (route) */
app.use('/api/categorie', categorieRoute)
app.use('/api/role', roleRoute)
app.use('/api/status', statusRoute)
app.use('/api/user', userRoute)
app.use('/api/projet', projetRoute)
app.use('/api/login', loginRoute)


app.use('/profile', express.static('public/upload/images'))



app.get('/api', (req, res) => {
    res.send('Hello express api')
})

app.use(({res}) => {
    res.status(404).json({
        message: `la page demander n'est pas trouver`
    })
})

/** lancement du server */
app.listen(port, () => console.log(`l'application redemer sur le port : http://localhost:${port}`))