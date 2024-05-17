const {
    ValidationError,
    UniqueConstraintError,
} = require("sequelize")
const {
    projet,
    status,
    user,
    categorie,
    fileProjet,
} = require("./../db/sequelize")
const { Op } = require("sequelize")
const { success } = require("../../helper")


/**
 * renvoie tous les categories
 * @param {*} req 
 * @param {*} res 
 */
const getProjets = async (req, res) => {

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

    return await projet.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            },

            include: [status, user, categorie, fileProjet],
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
const getProjet = async (req, res) => {

    await projet.findByPk(req.params.id, { include: [status, user] })
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `le projet demander n'est pas trouver`
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
const addProjet = async (req, res) => {

    await projet.create( req.body,{ include: [status, user, categorie], } )
        .then(Projet => { res.status(200).json(success(Projet)) })
        .catch(error => {
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
}

/**
 * modifier les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const updateProjet = async (req, res) => {
    const id = req.params.id
    await projet.update(req.body, { where: { id: id } })
        .then(item => {
            if (item === 0) {
                return res.status(404).json({
                    message: `aucune element trouver`
                })
            }
            return projet.findByPk(id)
                .then(item => {
                    if (item === null) {
                        return res.status(404).json({
                            message: `le projet demander n'est pas trouver`
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
                message: `le projet n'es pas pus etre modifier. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

/**
 * supprimer les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const deleteProjet = async (req, res) => {
    const id = req.params.id

    projet.findByPk(id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `le projet demande n'est pas trouver`
                })
            }
            projet.destroy({
                where: {
                    id: id
                }
            }).then(_ => res.status(200).json(success(item, `le projet ${item.id} : ${item.name} a ete supprimer avec success`)))
        })
        .catch(error => res.status(500).json({
            message: `une erreur est survenu ${error}`
        }))
}


module.exports = {
    getProjets,
    getProjet,
    addProjet,
    updateProjet,
    deleteProjet,
}