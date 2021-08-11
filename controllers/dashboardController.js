const Flash = require("../utils/Flash");
const Profile = require("../models/Profile");

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
      });
    }
  } catch (error) {
    next(error);
  }
};
exports.postCreateProfileController = (req, res, next) => {
    console.log('postCreateProfileController');
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