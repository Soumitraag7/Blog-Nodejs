const router = require('express').Router();
const {check,validationResult} = require('express-validator');
const User = require('../models/User');



router.get('/validator', (req, res) => {
    // res.render('playground/signup',{title: 'validation'});

    console.log(req.flash('error'))
    console.log(req.flash('success'))
})
router.post('/validator',
[
    check('name')
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
    check('email')
    .not()
    .isEmpty().withMessage('email is required')
    .normalizeEmail(),
    check('password')
    .not()
    .isEmpty().withMessage('password is required')
    .custom(value =>{
        if(value.length<5){
            throw new Error('password must be atleast 5 characters')
        }
        return true
    })
    ,
    check('confirmPassword')
    .not()
    .isEmpty().withMessage('confirmPassword is required')
    .custom((value,{req}) =>{
        if(value !== req.body.password){
            throw new Error('password does not match')
        }
        
        return true
    }),


],
(req, res) => {
     let error = validationResult(req);
     const  formatter = error => error.msg;
     console.log(error);
     console.log(error.isEmpty());
     console.log(error.mapped());
     console.log(error.formatWith(formatter).mapped());
     console.log(req.body);
     (!error.formatWith)?req.flash('error','this is error'):req.flash('success','this is success');

    //  res.render('playground/signup',{title: 'validation'});

})

module.exports = router;