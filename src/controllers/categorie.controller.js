const {
    ValidationError,
    UniqueConstraintError
} = require("sequelize")
const {
    success
} = require("../../helper")
const {
    categorie
} = require("./../db/sequelize")
const {
    Op
} = require("sequelize")

/**
 * renvoie tous les categories
 * @param {*} req 
 * @param {*} res 
 */
const getCategories = async (req, res) => {

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

    return await categorie.findAndCountAll({
            where: {
                category: {
                    [Op.like]: `%${name}%`
                }
            },
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
                    message: `auccune categorie corespont a la recherche`
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
        .catch(error => res.status(500).json({
            message: `impossible de trouver les categorie veiller reillessayer dans quelques instant`,
            data: error
        }))
}

/**
 * renvoie une categorie par rapport a son id
 * @param {*} req 
 * @param {*} res 
 */
const getCategorie = async (req, res) => {

    await categorie.findByPk(req.params.id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `la categorie demander n'est pas trouver`
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
const addCategorie = async (req, res) => {
    await categorie.create(req.body)
        .then(categorie => {
            res.status(200).json(success(categorie))
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
                message: `la categorie n'es pas pus etre ajouter. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

/**
 * modifier les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const updateCategorie = async (req, res) => {
    const id = req.params.id

    await categorie.update(req.body, {
            where: {
                id: id
            }
        })
        .then(category_res => {
            if (category_res === 0) {
                return res.status(404).json({
                    message: `aucune element trouver`
                })
            }
            return categorie.findByPk(id)
                .then(categorie_item => {
                    if (categorie_item === null) {
                        return res.status(404).json({
                            message: `la categorie demander n'est pas trouver`
                        })
                    }
                    return res.status(200).json(success(categorie_item))
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
                message: `la categorie n'es pas pus etre ajouter. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

/**
 * supprimer les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const deleteCategorie = async (req, res) => {
    const id = req.params.id

    categorie.findByPk(id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `la categorie demande n'est pas trouver`
                })
            }
            categorie.destroy({
                where: {
                    id: id
                }
            }).then(_ => res.status(200).json(success(item, `categorie ${item.id} : ${item.category} a ete supprimer avec success`)))
        })
        .catch(error => res.status(500).json({
            message: `une erreur est survenu ${error}`
        }))
}

module.exports = {
    getCategories,
    getCategorie,
    addCategorie,
    updateCategorie,
    deleteCategorie
}