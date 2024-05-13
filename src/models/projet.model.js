const projetModel = (sequelize, DataTypes) => {
    return sequelize.define('projet', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: {
                msg: `name existant`
            },
            validate: {
                len: [3, 100],
                notNull: {
                    msg: `champs requis`
                },
                notEmpty: {
                    msg: `champs requis`
                },
            }
        },

        objectif: {
            type: DataTypes.TEXT,
            allowNull: true,
            notNull: {
                msg: `champs requis`
            },
            notEmpty: {
                msg: `champs requis`
            },
        },

        slug: {
            type: DataTypes.STRING(150),
            allowNull: false,
            validate: {
                notNull: {
                    msg: `champs requis`
                },
                notEmpty: {
                    msg: `champs requis`
                },
            }
        },

        link: {
            type: DataTypes.STRING(100),
            allowNull: true,
            unique: {
                msg: `login existant`
            },
        },

        git_link: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },
    },

    {
        timestamps: true,
    })
}

module.exports = {
    projetModel
}