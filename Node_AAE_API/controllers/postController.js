const db=require('../models');
const Post=db.post;
const User=db.user;

const bcryptjs=require('bcryptjs'); 
const jwt=require('jsonwebtoken');

//creamos y guardamos un nuevo post
function createPost(req,res){
    //validamos la solicitud
    if(!req.body.titulo){
        res.status(400).send({
            message: "El titulo es requerido"
        });
        return;
    }
    //Creamos el post
    User.findOne({where:{id:req.body.userId}}).then(result=>{
        const post = {
            userId: req.body.userId,
            nombres:result.nombres,
            apellidos:result.apellidos,
            titulo:req.body.titulo,
            contenido:req.body.contenido,
        };

        
        //guardamos el post en la base de datos
        Post.create(post).then(result=>{
            res.status(201).json({
                message: "Publicado exitosamente"
            });
        })
        .catch(error=>{
            res.status(500).json({
                message: error.errors.map(e => e.message)
            });
        });
    });
    
};


//recuperamos toos los posts de la base de datos
function findAllPosts(req,res){

    /*const titulo=req.query.titulo;
    var condition=titulo?{titulo:{[Op.like]:`%${titulo}%`}}:null;*/

    Post.findAll({ order: [['updatedAt', 'DESC']]})
    .then(data=>{
         res.send(data);
    })
    .catch(error=>{
        res.status(500).json({
            message: error.errors.map(e => e.message)
        });
    });

};



//Encontramos un post por id
function findOnePost(req,res){
    const id=req.params.id;
    Post.findByPk(id)
    .then(data=>{
        if(data){
            res.send(data);

        }else{
            res.status(404).send({
                message: "No se encontro el post"
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error al recuperar el post con id: "+id
        });
    });
    
};

//actualizamos un post por id en la solicitud
function updatePost(req,res){
    const id = req.params.id;
    Post.update(req.body,{
        where:{id:id}
    })
    .then(num=>{
        if(num==1){
            res.send({
                message: "El post se actualizo correctamente"
            });
        }else{
            res.send({
                message: "No se encontro el post con id: "+id
            });
        }
        
    })
    .catch(error=>{
        res.status(500).json({
            message: error.errors.map(e => e.message)
        });
    });
};

//eliminamos un post por id en la solicitud
function deletePost(req,res){
    const id = req.params.id;
    Post.destroy({
        where:{id:id}
    })
    .then(num=>{
        if(num==1){
            res.send({
                message: "El post se elimino correctamente"
            });
        }else{
            res.send({
                message: "No se encontro el post con id: "+id
            });
        }
    })
    .catch(error=>{
        res.status(500).json({
            message: error.errors.map(e => e.message)
        });
    });
};


module.exports={
    createPost: createPost,
    findAllPosts: findAllPosts,
    findOnePost : findOnePost,
    updatePost: updatePost,
    deletePost: deletePost,
    
}
