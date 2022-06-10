const db = require('../models');
const User = db.user;
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req, res) {

    //Sign up
    User.findOne({ where: { correo: req.body.correo } }).then(result => {
        if (result) {
            res.status(409).json({
                message: "El correo ya existe",
            });
        } else {
            bcryptjs.genSalt(10, function (err, salt) {
                bcryptjs.hash(req.body.contrasenia, salt, function (err, hash) {
                    const user = {
                        nombres: req.body.nombres,
                        apellidos: req.body.apellidos,
                        correo: req.body.correo,
                        contrasenia: hash
                    }

                    //se valida la contraseña aquí, antes convertirse en token
                    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(req.body.contrasenia)) {
                        User.create(user).then(result => {
                            res.status(201).json({
                                message: "Usuario creado exitosamente",
                            });
                        }).catch(error => {
                            res.status(500).json({
                                message: error.errors.map(e => e.message)
                            });
                        });
                    } else {
                        res.status(409).json({
                            message: "La contraseña no cumple con el formato correcto",
                        });
                    }


                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "El campo correo no puede quedar vacíogo salió mal",
        });
    });
}


function login(req, res) {
    User.findOne({ where: { correo: req.body.correo } }).then(user => {
        if (user === null) {
            res.status(401).json({
                message: "Credenciales incorrectas",
            });
        } else {
            bcryptjs.compare(req.body.contrasenia, user.contrasenia, function (err, result) {
                if (result) {
                    const token = jwt.sign({
                        correo: user.correo,
                        userId: user.id
                    }, process.env.JWT_KEY, function (err, token) {
                        res.status(200).json({
                            message: "Autenticación Exitosa",
                            userId: user.id,
                            nombres: user.nombres,
                            token: token
                        });
                    });
                } else {
                    res.status(401).json({
                        message: "Credenciales incorrectas",
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: "Algo salió mal",
        });
    });
}

function postsByUser(req, res) {
    const id = req.params.id;
    User.findByPk(id, { include: ["posts"]})
     .then(data => {
         if(data){
             res.send(data.posts);
         }else{
             res.status(400). send({
                 message: `No se ha encontrado el post con clave ${id}`
             })
         }
     })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Ha ocurrido un error al encontrar el post" + id
        })
    })

}


module.exports = {
    signUp: signUp,
    login: login,
    postsByUser: postsByUser 
    
} 