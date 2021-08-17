const jwt = require('jsonwebtoken')

// Checks if there is a valid token and authentification 
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')[1]; // Authorization: Bearer {token value}
    if (!token || token === '' ) {
        req.isAuth = false;
        return next();
    }
    let decodedToken;
    try {
       decodedToken = jwt.verify(token, 'somesupersecretkey');
    } catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
};