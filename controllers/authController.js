const User = require('../models/User');
const bcrypt = require('bcrypt');
const Flash = require('../utils/Flash')
const {
    validationResult
} = require('express-validator');
exports.getSignUpController = (req, res, next) => {

    
    res.render('pages/auth/signup', {
        title: 'Signup page',
        error:{},
        value:{},
        flashMessage: Flash.getMessage(req)
    })
}
exports.postSignUpController = async (req, res, next) => {
    let {
        name,
        email,
        password
    } = req.body;

    let error = validationResult(req).formatWith(error => error.msg);
    if (!error.isEmpty()) {
        // console.log(error.mapped());
        req.flash('fail','Check Your Form');
        return res.render('pages/auth/signup', {
            title: 'Signup page',
            error: error.mapped(),
            value:{
                name,email
            },
            flashMessage: Flash.getMessage(req)

        })
    }


    try {
        let hashPassword = await bcrypt.hash(password, 11)
        const user = new User({
            name,
            email,
            password: hashPassword
        })
        let data = await user.save();
        console.log('user created successfully'); //TODO: should be removed
        req.flash('success','Singnup Success')
        res.render('pages/auth/signup', {
            title: 'Signup page',
            error:{},
            value:{},
            flashMessage: Flash.getMessage(req)

        });

    } catch (error) {
        next(error);
    }
    // console.log(req.body);
    // res.render('pages/auth/signup')

}
exports.getLoginController = (req, res, next) => {
    res.render('pages/auth/login', {
        title: 'Login page',
        error:{},
        value:{},
        flashMessage: Flash.getMessage(req)

    })
}
exports.postLoginController = async (req, res, next) => {
    let {
        email,
        password
    } = req.body;
    let error = validationResult(req).formatWith(error => error.msg);
    if (!error.isEmpty()) {
        req.flash('fail','Check Your Form');

        return res.render('pages/auth/login', {
            title: 'Login page',
            error: error.mapped(),
            value:{
                email
            },
            flashMessage: Flash.getMessage(req)
            
        })
    }

    try {
        let userName = await User.findOne({
            email
        });
        if (!userName) {
            req.flash('fail','invalid email or password')
            res.render('pages/auth/login', {
                title: 'Login page',
                error: error.mapped(),
                value:{
                    email
                },
                flashMessage: Flash.getMessage(req)
                
            })
        }
        let hashPassword = await bcrypt.compare(password, userName.password);
        if (!hashPassword) {
            req.flash('fail','invalid email or password')
            res.render('pages/auth/login', {
                title: 'Login page',
                error: error.mapped(),
                value:{
                    email
                },
                flashMessage: Flash.getMessage(req)
                
            })
        }

        req.session.isLoggedIn = true;
        req.session.user =userName;

        console.log('user login successfully');//TODO: should be removed
        req.flash('success','user login successfully');

       res.redirect('/dashboard')

    } catch (error) {
        next(error);
    }

    // res.send('login post');
}

exports.logoutController =(req, res, next)=>{
    req.session.destroy(err=>{
        if(err) {
            return next(err);
        }
    })
    res.redirect('/auth/login'); 
}