const {Schema,model} = require('mongoose');

const profileSchema = new Schema({
    user: {
        type:Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bio: {
        type:String,
        trim:true,
    },
    profilePics:String,
    links:{
        website:String,
        facebook:String,
        youtube:String,
        github:String
    },
    post:[
        {
            type:Schema.Types.ObjectId,
            ref: 'Post',
        }
    ],
    bookmark: [
        {
            type:Schema.Types.ObjectId,
            ref: 'Post',
        }
    ]
},{
    timestamps:true,
})

module.exports = model('Profile',profileSchema);



