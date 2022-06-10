module.exports = app => {
    const checkAuthMiddleware = require('../middleware/check-auth');

    const users = require('../controllers/userController');
    var router = require('express').Router();

    // crear rutas
    router.post('/sign-up', users.signUp); //registro
    router.post('/login', users.login); //inicio
    //posts por usuario
    router.get('/puser/:id',checkAuthMiddleware.checkAuth, users.postsByUser);

    app.use('/api/user', router);
}