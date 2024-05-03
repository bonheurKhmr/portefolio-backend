/** creation du port */

const express = require("express")
const app = express()
const port = 3000

/** les endpoint */
app.get('/', (req, res) =>  res.send('hello Express on va'))

/** lancement du server */
app.listen(port, () => console.log (`l'application redemer sur le port : http://localhost:${port}`))
