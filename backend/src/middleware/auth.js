const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ msg: 'No token, access denied'})
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(err){
        res.status(400).json({msg: 'Token is not valid'});
    }
}

const isAdmin = (req, res, next) => {
    // Double-check that auth middleware ran first
    if (!req.user) {
        return res.status(401).json({ msg: 'Not authenticated' });
    }

    if (!req.user.isAdmin) {
        return res.status(403).json({ msg: 'Admin only' });
    }

    next();
};

module.exports = {auth, isAdmin};