module.exports = (sequelize, DataTypes) => {
    return sequelize.define('role', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: `role existant`
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