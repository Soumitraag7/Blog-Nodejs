const {body} = require('express-validator')
const cheerio = require('cheerio')


module.exports = [
    body('title')
    .not().isEmpty().withMessage('title cant be empty')
    .trim(),
    body('body')
    .not().isEmpty().withMessage('body cant be empty')
    .custom(value =>{
        let node = cheerio.load(value);
        let text  = node.text();

        if(text.length>5000){
            throw new Error('Body cannot be Greater than 5000 charecters')
        }
        return true
    }),
    body('tags')
    .not().isEmpty().withMessage('Tags cant be empty')
    .custom(data=>{
        let arr = data.split(',').length
        if(arr>10){
            throw new Error('Tags count can not be more than 10')
        }
        return true
    })

]