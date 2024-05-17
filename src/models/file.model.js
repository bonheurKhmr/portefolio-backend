const fileProjetModel = (sequelize, DataTypes) => {
    return sequelize.define('fileProjet', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        new_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },

    {
        timestamps: true,
    })
}

module.exports = {fileProjetModel}