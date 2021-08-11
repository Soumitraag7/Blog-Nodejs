const {body} = require('express-validator');
const User = require('../models/User');
module.exports = [
    
    body('name')
    .not()
    .isEmpty().withMessage('name is required')
    .isLength({max:15,min:2})
    .custom(async  name =>{
        let user = await User.findOne({name})
        if(user){
            return Promise.reject('username used')
        }
    })
    .trim(),
    body('email')
    .not()
    .isEmpty().withMessage('email is required')
    .custom(async email =>{
        let user = await User.findOne({email});
        if(user){
             throw new Error('Email is already used')
        }
        return true
    }),
    // .normalizeEmail(),
    body('password')
    .not()
    .isEmpty().withMessage('password is required')
    .custom(value =>{
        if(value.length<5){
            throw new Error('password must be atleast 5 characters')
        }
        return true
    })
    ,
    body('confirmPassword')
    .not()
    .isEmpty().withMessage('confirmPassword is required')
    .custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error('password does not match')
        }
        
        return true
    }),



]