const userModel = (sequelize, DataTypes) => {
    return sequelize.define('user', {
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

        kind: {
            type: DataTypes.INTEGER(1),
            allowNull: true,
            notNull: {
                msg: `champs requis`
            },
            notEmpty: {
                msg: `champs requis`
            },
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: {
                msg: `email existant`
            },
            validate: {
                isEmail: {
                    msg: `email incorrect`
                },
                notNull: {
                    msg: `champs requis`
                },
                notEmpty: {
                    msg: `champs requis`
                },
            }
        },

        login: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: {
                msg: `login existant`
            },
            validate: {
                notNull: {
                    msg: `champs requis`
                },
                notEmpty: {
                    msg: `champs requis`
                },
            }
        },

        password: {
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

        image: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: 'user.png'
        },

        is_connected: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: '0'
        },

        rember_token: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: 1,
        }
    },

    {
        timestamps: true,
    })
}

module.exports = {
    userModel
}