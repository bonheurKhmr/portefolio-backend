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
            unique: {
                msg: `categorie existant`
            },
            validate: {
                notNull: {
                    msg: `champs requis`
                },
                notEmpty: {
                    msg: `champs requis`
                },
                min: {
                    args: [3],
                    msg: `la valeur saisie est trop court`
                },
                max: {
                    args: [10],
                    msg: `la valeur saisie est trop court`
                }
            }
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