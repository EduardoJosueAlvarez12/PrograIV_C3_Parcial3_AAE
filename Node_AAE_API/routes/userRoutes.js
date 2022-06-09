module.exports = app => {
    const users = require('../controllers/userController');
    var router = require('express').Router();

    // crear rutas
    router.post('/sign-up', users.signUp); //registro
    router.post('/login', users.login); //inicio

    app.use('/api/user', router);
}