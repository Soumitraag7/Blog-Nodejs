const Flash = require("../utils/Flash");
const Profile = require("../models/Profile");
const {validationResult} = require('express-validator');
const User = require('../models/User');

exports.getDashboardController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.render("pages/dashboard/dashboard", {
        title: "Dashboard",
        flashMessage: Flash.getMessage(req),
      });
    } else {
      res.redirect("/dashboard/create-Profile");
    }
  } catch (error) {
    next(error);
  }
};

exports.getCreateProfileController = async (req, res, next) => {
  try {
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      return res.redirect("/dashboard/edit-Profile");
    } else {
      return res.render("pages/dashboard/create-Profile", {
        title: "Dashboard",
        flashMessage: Flash.getMessage(req),
        error: {}

      });
    }
  } catch (error) {
    next(error);
  }
};
exports.postCreateProfileController =async (req, res, next) => {
    let errors = validationResult(req).formatWith(error => error.msg)
    if(!errors.isEmpty()) {
      return res.render("pages/dashboard/create-Profile",{
        title: "create profile page",
        flashMessage: Flash.getMessage(req),
        error: errors.mapped()
      })
    }
  

    const  {
      name,
      bio,
      title,
      website,
      facebook,
      youtube,
      github,

    } = req.body

    let profile = new Profile({
      user:req.user._id,
      name,
      bio,
      title,
      profilePics:req.user.profilePics,
      links:{
        website:website || '',
        facebook:facebook || '',
        youtube:youtube || '',
        github:github || '',

      },
      post:[],
      bookmark:[]

    })

    try {
      let createprofile = await profile.save()
      await User.findOneAndUpdate(
        {_id:req.user._id},
        {
          $set: {
            profile:createprofile._id
          }
        }
      )
      req.flash('success','Profile created successfully')
      res.redirect('/dashboard');
      
    } catch (error) {
      next(error);
      
    }
}

exports.getEditProfileController =(req,res,next) => {
    res.render("pages/dashboard/edit-Profile", {
        title: "Dashboard",
        flashMessage: Flash.getMessage(req),
      });
}


exports.postEditProfileController =(req,res,next) => {
    console.log('postEditProfileController');
}