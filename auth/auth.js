const jwt = require("jsonwebtoken")
const privateKey = require ("./private.key")

module.exports = (req, res, next) => {
    const autorizationHeader = req.headers.authorization

    if (!autorizationHeader) {
        return res.status(401).json({
            message: `vous n'avez pas fournie de jeton d'authentification`,
        })
    }

    const token = autorizationHeader.split(' ')[1]
    const decodeToken = jwt.verify(token, privateKey, (error, decodeToken) => {
        if (error) {
            return res.status(401).json({
                message: `l'utilisateur n'es pas autoriser a acceder a cette ressource`
            })
        }

        const userId = decodeToken.userId
        if (req.body.userId && res.body.userId !== userId) {
            return res.status(401).json({
                message: `l'identifiant  de l'utilisateur est invalide`
            })
        } else {
            next()
        }
    })
}