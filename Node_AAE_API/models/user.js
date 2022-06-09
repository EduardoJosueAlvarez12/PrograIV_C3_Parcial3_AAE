module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        nombres: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1,50],
                    msg: "El campo nombres no puede estar vacío ni tener más de 50 carácteres"
                },
                notNull: {
                   msg: "El campo nombres no puede quedar vacío" 
                }
            }
        },

        apellidos: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1,50],
                    msg: "El campo apellidos no puede estar vacío ni tener más de 50 carácteres"
                },
                notNull: {
                   msg: "El campo apellidos no puede quedar vacío" 
                }
            }
        },

        correo: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [1,50],
                    msg: "El campo correo no puede estar vacío ni tener más de 50 carácteres"
                },
                notNull: {
                   msg: "El campo correo no puede quedar vacío" 
                }
            }
        },

        contrasenia: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                   msg: "El campo contraseña no puede quedar vacío" 
                }
                // not: {
                //     args: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/],
                //     msg: "El formato de la contraseña es incorrecto"
                // }
            }
        }
    });

    return User;
};
