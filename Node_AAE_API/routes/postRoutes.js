module.exports = app => {
    const Posts=require('../controllers/postController');
    const checkAuthMiddleware = require('../middleware/check-auth');
    var router =require("express").Router();

    //crear un nuevo post
    router.post("/", checkAuthMiddleware.checkAuth, Posts.createPost);
    //recuperar todos los posts
    router.get("/",  Posts.findAllPosts);
    //recuperar un post por id
    router.get("/:id",checkAuthMiddleware.checkAuth, Posts.findOnePost);
    //recuperar un post por titulo
    router.get("/ptitulo/:titulo", Posts.findPostByTitle)
    //actualizar un post por id
    router.put("/:id",checkAuthMiddleware.checkAuth, Posts.updatePost);
    //eliminar un post por id
    router.delete("/:id",checkAuthMiddleware.checkAuth, Posts.deletePost);
    
    app.use('/api/posts',router);
};