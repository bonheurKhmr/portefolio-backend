const {
    Sequelize,
    DataTypes
} = require('sequelize');

const categorieModel = require("./../models/categorie.model")
const {roleModel} = require("./../models/role.model")
const {userModel} = require("./../models/user.model")
const statuModel = require("./../models/status.model");
const { projetModel } = require('../models/projet.model');

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
const projet = projetModel(sequelize, DataTypes)

user.hasMany(projet, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: {
        field: 'userId',
        allowNull: false
    },
})
projet.belongsTo(user)

status.hasMany(projet, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: {
        field: 'statusId',
        allowNull: false
    },
})
projet.belongsTo(status)

role.hasMany(user, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
    foreignKey: {
        field: 'roleId',
        allowNull: false
    },
})

user.belongsTo(role)

categorie.belongsToMany(projet, { through: 'categoryProjets' });
projet.belongsToMany(categorie, { through: 'categoryProjets' });

const initDB = () => {
    return sequelize.sync({ force: false })
}

module.exports = {
    initDB,
    categorie,
    role,
    user,
    status,
    projet,
}
