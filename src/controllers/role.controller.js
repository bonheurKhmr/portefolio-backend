const {
    ValidationError,
    UniqueConstraintError
} = require("sequelize")
const {
    success
} = require("../../helper")
const {
    role
} = require("./../db/sequelize")
const {
    Op
} = require("sequelize")

/**
 * renvoie tous les roles
 * @param {*} req 
 * @param {*} res 
 */
const getRoles = async (req, res) => {

    const limit = parseInt(req.query.limit) || 5
    const name = req.query.name || ""
    const page = parseInt(req.query.page) || 1
    const offset = (page - 1) * limit
    const order = req.query.order || 'DESC'
    const orderBy = req.query.orderby || 'id'

    if (name.length <= 2 && name !== "") {
        return res.status(400).json({ message: `la recherche doit containir au minume 3 caracteres` })
    }

    return await role.findAndCountAll({
        where: { 
            role: {
                [Op.like]: `%${name}%`
            } 
        },
        order: [[orderBy, order]],
        offset: offset,
        limit: limit,
    })
    .then(({count, rows}) => {
        const totalPage = Math.ceil(count / limit)
        if (count <= 0) {
            return res.status(404).json({ message: `la liste de role est vide` })
        }
        res.status(200).json({
            message: `affiche ${limit} sur ${count} elements`,
            pagination: {
                rows,
                page,
                limit,
                totalPage
            }
        })
    })            
    .catch(error => res.status(500).json({
        message: `impossible de trouver les roles veiller reessayer dans quelques instant`,
        data: error
    }))
}

/**
 * renvoie une categorie par rapport a son id
 * @param {*} req 
 * @param {*} res 
 */
const getRole = async (req, res) => {

    await role.findByPk(req.params.id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `le role demander n'est pas trouver`
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
const addRole = async (req, res) => {
    await role.create(req.body)
        .then(role => {
            res.status(200).json(success(role))
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
                message: `le role n'es pas pus etre ajouter. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

/**
 * modifier les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const updateRole = async (req, res) => {
    const id = req.params.id

    await role.update(req.body, {
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
            return role.findByPk(id)
                .then(item => {
                    if (item === null) {
                        return res.status(404).json({
                            message: `le role demander n'est pas trouver`
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
                message: `le role n'es pas pus etre ajouter. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

/**
 * supprimer les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const deleteRole = async (req, res) => {
    const id = req.params.id

    role.findByPk(id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `le role demande n'est pas trouver`
                })
            }
            role.destroy({
                where: {
                    id: id
                }
            }).then(_ => res.status(200).json(success(item, `role ${item.id} : ${item.category} a ete supprimer avec success`)))
        })
        .catch(error => res.status(500).json({
            message: `une erreur est survenu veiller reessayer dans quelques instant`,
            data: error
        }))
}

module.exports = {
    getRoles,
    getRole,
    addRole,
    updateRole,
    deleteRole,
}