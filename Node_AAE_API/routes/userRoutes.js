module.exports = app => {
    const checkAuthMiddleware = require('../middleware/check-auth');

    const users = require('../controllers/userController');
    var router = require('express').Router();

    //registro
    router.post('/sign-up', users.signUp);
    //inicio
    router.post('/login', users.login); 
    //posts por usuario
    router.get('/puser/:id',checkAuthMiddleware.checkAuth, users.postsByUser);

    app.use('/api/user', router);
}