module.exports=(sequelize, Sequelize)=>{
    const Post=sequelize.define("post",{

        nombres:{
            type:Sequelize.STRING,
            allowNull:false
        },
        apellidos:{
            type:Sequelize.STRING,
            allowNull:false
        },

        titulo: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1,75],
                    msg: "El campo titulo no puede estar vacío ni tener más de 75 carácteres"
                },
                notNull: {
                     msg: "El campo titulo no puede quedar vacío"
                }
            }
        },
        contenido: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [20,1000],
                    msg: "El campo contenido debe tener entre 20 y 1000 carácteres"
                },
                notNull: {
                    msg: "El campo contenido no puede quedar vacío"
                }
            }
        },

    });
    return Post;

}


    
