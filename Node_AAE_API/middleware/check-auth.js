const jwt = require('jsonwebtoken');

//esta función protege las rutas con token en las que se use
function checkAuth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodedToken;
        next();
    } catch (e) {
        return res.status(401).json({
            'message': "El token es inválido o ha expirado, por favor inicie sesión",
            'error': e
        });
    }
}

module.exports = {
    checkAuth: checkAuth
}