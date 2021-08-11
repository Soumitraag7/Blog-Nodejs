const Profile = require("../models/Profile");
const User = require("../models/User");



const fs = require("fs");

exports.profilePicUpoloadController = async (req, res, next) => {
  if (req.file) {
    try {
      let profile = await Profile.findOne({ user: req.user._id });
      let profilePics = `/uploads/${req.file.filename}`
      if (profile) {
          await Profile.findOneAndUpdate(
              {user: req.user._id},
              {$set: { profilePics }}
          )
      }
      await User.findOneAndUpdate(
          {_id: req.user._id},
          {$set: { profilePics }}
      )
      res.status(200).send(profilePics)
    

    } catch (error) {
        console.log(error);
        next(error);
        
    }
  } else {
    res.status(500).send({profilePics:req.user.profilePics});

  }
};


exports.deleteProfilePic = (req,res,next) =>{
    try {
        let defaulProfile = '/uploads/default.png'
        let currentProfile = req.user.profilePics

        fs.unlink(`public/${currentProfile}`,async () =>{
            let profile = await Profile.findOne({ user: req.user._id });
            if (profile) {
                await Profile.findOneAndUpdate(
                    {user: req.user._id},
                    {$set: { profilePics :defaulProfile }}
                )
            }
            await User.findOneAndUpdate(
                {_id: req.user._id},
                {$set: { profilePics : defaulProfile }}
            )
        })
        res.redirect('/dashboard/create-Profile')
        

        
    } catch (error) {
        console.log(error);
        next(error);
        
    }   
}