const {validationResult} = require('express-validator');
const readingTime  = require('reading-time')
const Post = require('../models/Post')
const Profile = require("../models/Profile");

const Flash = require("../utils/Flash");

exports.getCreatePostController = (req, res, next) => {
    console.log('working on create post');
    res.render("pages/post/createPost", {
        title: "Create Post",
        flashMessage: Flash.getMessage(req),
        error:{},
        value:{}
      });
}
exports.postCreatePostController = async(req, res, next) => {
    let {title,body,tags} = req.body
    let error = validationResult(req).formatWith(error => error.msg);

    if(!error.isEmpty()){
        return res.render('pages/post/createPost',{
            title:'Create post',
            flashMessage: Flash.getMessage(req),
            error:error.mapped(),
            value:{
                title,
                body,
                tags
            }
        })
    }

    if(tags){
        tags = tags.split(',').map((item)=> item.trim())
    }

    let post  = new Post({
        title,
        body,
        tags,
        author:req.user._id,
        thumbnail:'',
        readtime:readingTime(body).text,
        comments:[],
        likes:[],
        dislikes:[],
        shares:[]


    })

    if(req.file){
        post.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        let creatPost = await post.save();
        await Profile.findOneAndUpdate(
            {user: req.user._id},
            {$set:{$push:{'post':creatPost._id}}}
        )

        req.flash('success','Post created successfully');
        res.redirect(`/post/edit/${creatPost._id}`);

        
    } catch (error) {
        next(error)
        
    }


    
    
}


exports.editPostController =async (req, res, next)=>{
    let postId = req.params.id
    try {
        let post = await Post.findOne({author: req.user._id,_id: postId})

        if(!post) {
            let error  = new Error('404 page not found')
            error.status = 404
            throw new Error
        }
        res.render('pages/post/editPost',{
            title: 'Edit post page',
            error :{},
            flashMessage: Flash.getMessage(req),
            post
        })
        console.log(post.thumbnail);
        
    } catch (error) {
        next(error)
        
    }
}