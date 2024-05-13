const {
    ValidationError,
    UniqueConstraintError
} = require("sequelize")

const { user } = require("./../../db/sequelize")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const privateKey = require ("./../../../auth/private.key")
const { json } = require("body-parser")

const login = async (req, res) => {
    user.findOne({ where: { login: req.body.login } })
    .then (user => {

        if (!user) {
            return res.status(404).json({ message: `veiller verifier les information entre` }) 
        }

        bcrypt.compare( req.body.password, user.password )
        .then (isPasswordValide => {
            if (!user.is_active) {
                return res.status(401).json({ message: `votre compte n'es pas activer` }) 
            }

            if (!isPasswordValide) {
                return res.status(401).json({ message: `veiller verifier les information entre` }) 
            }

            //generer un token JWT
            const token = jwt.sign(
                { userId: user.id },
                privateKey,
                { expiresIn: '24h' }
            )

            return res.status(200).json({
                message: `vous etez connecter avec success`,
                data: user,
                token
            })
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: `une erreur est survenu reessayer dans quelques instant`,
            data: error
        })
    })
}

module.exports = {
    login
}