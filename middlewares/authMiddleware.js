const User = require('../models/User')
exports.bindWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next()
        }

        try {
            let user = await User.findById(req.session.user._id);
            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            next();
        }
    }
}

exports.isAthencated = (req,res,next) => {
    if(!req.session.isLoggedIn){
        res.redirect('/auth/login');
    }
    next();
}

exports.isUnAthencated=(req,res,next) => {
    if(req.session.isLoggedIn){
        res.redirect('/dashboard')
    }
    next();
}