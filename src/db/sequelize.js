const {
    Sequelize,
    DataTypes
} = require('sequelize');

const categorieModel = require("./../models/categorie.model")
const {roleModel} = require("./../models/role.model")
const {userModel} = require("./../models/user.model")
const statuModel = require("./../models/status.model")

// connexion a la base de donne
const sequelize = new Sequelize('portefolio', 'root', 'root', {
    host: '127.0.0.1',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2'
    },
    logging: true
});

/** appel des modeles */
const categorie = categorieModel(sequelize, DataTypes)
const role = roleModel(sequelize, DataTypes)
const user = userModel(sequelize, DataTypes)
const status = statuModel(sequelize, DataTypes)

role.hasMany(user, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
})

user.belongsTo(role, {
    foreignKey: {
        field: 'roleId',
        allowNull: false
    },
})

const initDB = () => {
    return sequelize.sync({ force: false })
}

module.exports = {
    initDB,
    categorie,
    role,
    user,
    status,
}
