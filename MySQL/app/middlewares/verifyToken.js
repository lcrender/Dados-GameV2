const jwt = require('jsonwebtoken');
const { JWTSECRET } = process.env;

function verifyToken (req, res, next) {
    try {
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token provided'
        })
    } 
    const decoded = jwt.verify(token, JWTSECRET);
    req.userId = decoded.id;
    next();
    } catch (err) {
        const errorJson = {auth: false, message: 'Error de autenticación: ' + err.message };
        res.status(401).json(errorJson);
    }
};

module.exports = verifyToken;