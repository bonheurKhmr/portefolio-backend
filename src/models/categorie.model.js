module.exports = (sequelize, DataTypes) => {
    return sequelize.define('categorie', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },

    {
        timestamps: true,
    })
}