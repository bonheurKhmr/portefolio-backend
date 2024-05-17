const {
    ValidationError,
    UniqueConstraintError
} = require("sequelize")
const { success } = require("../../helper")
const { fileProjet } = require("./../db/sequelize")

/**
 * renvoie une fileProjet par rapport a son id
 * @param {*} req 
 * @param {*} res 
 */
const getFile = async (req, res) => {

    await fileProjet.findByPk(req.params.id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `la fileProjet demander n'est pas trouver`
                })

            }
            res.status(200).json({
                link: `localhost:3000/projet_img/${item.new_name}`,
                data: item
            })
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
const addFile = async (req, res) => {
    const data = {
        name: req.file.originalname, 
        new_name: req.file.filename,
        type: req.file.mimetype,
        projetId: req.body.projetId
    }

    await fileProjet.create(data)
        .then(fileProjet => { 
            res.status(200).json({
                message: `enregistrement avec success`,
                link: `localhost:3000/projet_img/${fileProjet.new_name}`,
                data: fileProjet
            })
        })
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
                message: `la fileProjet n'es pas pus etre ajouter. veiller essayer dans quelques instant`,
                data: error
            })
        })
}

/**
 * supprimer les donnes dans la base de donnes
 * @param {*} req 
 * @param {*} res 
 */
const deleteFile = async (req, res) => {
    const id = req.params.id

    fileProjet.findByPk(id)
        .then(item => {
            if (item === null) {
                return res.status(404).json({
                    message: `la fileProjet demande n'est pas trouver`
                })
            }
            fileProjet.destroy({
                where: {
                    id: id
                }
            }).then(_ => res.status(200).json(success(item, `fileProjet ${item.id} : ${item.category} a ete supprimer avec success`)))
        })
        .catch(error => res.status(500).json({
            message: `une erreur est survenu ${error}`
        }))
}

module.exports = {
    getFile,
    addFile,
    deleteFile
}