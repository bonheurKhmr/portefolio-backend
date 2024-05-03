/** creation du port */

const express = require("express")
const app = express()
const port = 3000

/** les endpoint */
app.get('/', (req, res) =>  res.send('hello Express'))

/** lancement du server */
app.listen(port, () => `l'application redemer sur le port : http://localhost:${port}`)
