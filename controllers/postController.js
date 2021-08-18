const {validationResult} = require('express-validator');

const Flash = require("../utils/Flash");

exports.getCreatePostController = (req, res, next) => {
    console.log('working on create post');
    res.render("pages/post/createPost", {
        title: "Create Post",
        flashMessage: Flash.getMessage(req),
        
      });
}
exports.postCreatePostController = (req, res, next) => {
    console.log(req.body);

    let error = validationResult(req).formatWith(error => error.msg);
    console.log(error.mapped());
    
    
}