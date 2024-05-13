module.exports = (sequelize, DataTypes) => {
    return sequelize.define('statu', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                msg: `statu existant`
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
                    msg: `la valeur saisie est trop grand`
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