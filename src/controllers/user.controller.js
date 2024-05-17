const {
    ValidationError,
    UniqueConstraintError,
} = require("sequelize")
const {
    success
} = require("../../helper")
const {
    user,
    role
} = require("./../db/sequelize")
const {
    Op
} = require("sequelize")

const bcrypt = require("bcrypt")


/**
 * renvoie tous les categories
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {

    const limit = parseInt(req.query.limit) || 5
    const name = req.query.name || ""
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit
    const order = req.query.order || 'DESC'
    const orderBy = req.query.orderby || 'id'

    if (name.length <= 2 && name !== "") {
        return res.status(400).json({
            message: `la recherche doit containir au minume 3 caracteres`
        })
    }

    return await user.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            },

            include: role,
            order: [
                [orderBy, order]
            ],
            offset: offset,
            limit: limit,
        })
        .then(({
            count,
            rows
        }) => {
            const totalPage = Math.ceil(count / limit)
            if (count <= 0) {
                return res.status(404).json({
                    message: `auccune utilisateur corespont a la recherche`
                })
            }
            res.status(200).json({
                message: `affiche ${limit} sur ${count} elements`,
                data: rows,
                pagination: {
                    page,
                    limit,
                    totalPage
                }
            })
        })

}

/**
 * renvoie une categorie par rapport a son id
 * @param {*} req 
 * @param {*} res 
 */
const getUser = async (req, res) => {

    await user.findByPk(req.params.id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `l'utilisateur demander n'est pas trouver`
                })

            }
            res.status(200).json(success(item))
        }).catch(error => {
            res
                .status(500)
                .json({
                    message: `une erreur est survenu : ${error}`
                })
        })
}

/**
 * enregistre les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const addUser = async (req, res) => {

    let data = req.body
    let password = req.body.password

    await bcrypt
        .hash(password, 10)
        .then(hash => {
            data.password = hash
            data.image = data.kind === 1 ? 'home.png' : 'femme.png'
            return user.create(data)
                .then(user => {
                    res.status(200).json(success(user))
                }).catch(error => {
                    if (error instanceof ValidationError) {
                        return res.status(400).json({
                            message: error.message,
                            data: error
                        })
                    }

                    if (error instanceof UniqueConstraintError) {
                        return res.status(400).json({
                            message: error.message,
                            data: error
                        })
                    }
                    res.status(500).json({
                        message: `l'utilisateur n'as pas pus etre ajouter. veiller essayer dans quelques instant`,
                        data: error
                    })
                })
        }).catch(error => {
            res.status(500).json({
                message: `l'utilisateur n'as pas pus etre ajouter. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

/**
 * modifier les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async (req, res) => {
    const id = req.params.id
    const data = req.body
    delete data.password

    await user.update(data, {
            where: {
                id: id
            }
        })
        .then(item => {
            if (item === 0) {
                return res.status(404).json({
                    message: `aucune element trouver`
                })
            }
            return user.findByPk(id)
                .then(item => {
                    if (item === null) {
                        return res.status(404).json({
                            message: `la categorie demander n'est pas trouver`
                        })
                    }
                    return res.status(200).json(success(item))
                })

        }).catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    message: error.message,
                    data: error
                })
            }

            if (error instanceof UniqueConstraintError) {
                return res.status(400).json({
                    message: error.message,
                    data: error
                })
            }
            res.status(500).json({
                message: `l'utilisateur n'es pas pus etre ajouter. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

/**
 * supprimer les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = async (req, res) => {
    const id = req.params.id

    user.findByPk(id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `la categorie demande n'est pas trouver`
                })
            }
            user.destroy({
                where: {
                    id: id
                }
            }).then(_ => res.status(200).json(success(item, `l'utilisateur ${item.id} : ${item.name} a ete supprimer avec success`)))
        })
        .catch(error => res.status(500).json({
            message: `une erreur est survenu ${error}`
        }))
}

const changePassword = async (req, res) => {

    const data = {
        password: req.body.password
    }
    const id = req.params.id

    await bcrypt
        .hash(data.password, 10)
        .then(hash => {
            data.password = hash
            return user.update(data, {
                    where: {
                        id: id
                    }
                })
                .then(item => {
                    if (item === 0) {
                        return res.status(404).json({
                            message: `aucune element trouver`
                        })
                    }
                    return user.findByPk(id)
                        .then(item => {
                            if (item === null) {
                                return res.status(404).json({
                                    message: `l'utilisateur demander n'est pas trouver`
                                })
                            }
                            return res.status(200).json(success(item))
                        })

                }).catch(error => {
                    if (error instanceof ValidationError) {
                        return res.status(400).json({
                            message: error.message,
                            data: error
                        })
                    }

                    if (error instanceof UniqueConstraintError) {
                        return res.status(400).json({
                            message: error.message,
                            data: error
                        })
                    }
                })

        }).catch(error => {
            res.status(500).json({
                message: `l'utilisateur n'as pas pus etre ajouter. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

const updateImage = async (req, res) => {
    const data = { image: req.file.filename }
    const id = req.params.id

    await user.update(data, { where: { id: id }
    }).then(_ => {
        return user.findByPk(id).then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `l'utilisateur demander n'est pas trouver`
                })
            }
            return res.status(200).json({
                message: `le profile a ete mis a jour avec success`,
                link: `localhost:3000/profile/${item.image}`,
                data: item
            })
        })
    }).catch(error => {
        res.status(500).json({ 
            message: `une erreur est survenue veiller reessayer dans quelques instant`,
            data: error
        })
    })
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    changePassword,
    updateImage,
}