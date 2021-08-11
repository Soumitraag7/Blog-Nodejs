const {body} = require('express-validator');
const validator  = require('validator');
const linkValidator = value => {
    if(value){
        if(!validator.isURL(value)){
            throw new Error('Please provide a valid url')
        }
    }
    return true;
}
module.exports = [
    
    body('name')
    .not()
    .isEmpty().withMessage("Name can't be empty")
    .isLength({max:32})
    .trim(),

    body('bio')
    .not()
    .isEmpty().withMessage("Boi can't be empty")
    .trim()
    ,
    body('title')
    .not()
    .isEmpty().withMessage("title can't be empty")
    .trim(),
    body('website')
    .custom(linkValidator)
    ,
    body('facebook')
    .custom(linkValidator)
    ,
    body('youtube')
    .custom(linkValidator)
    ,
    body('github')
    .custom(linkValidator)

]