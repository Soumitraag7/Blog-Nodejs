const Post = require('../models/Post')
const Profile = require('../models/Profile')
const Flash = require('../utils/Flash')
const moment = require('moment')

exports.explorerGetController = async (req, res, next) => {

    function genDate(days){
        let date=moment().subtract(days,'days')
        return date.toDate()
    }

    function genereteFilterObject(filter){
        let filterObject ={}
        let order =1;

        switch(filter){ 
            case 'week':{
                filterObject ={
                    createdAt:{
                        $gt:genDate(7)
                    }
                }
                order =-1
                break;
            }
            case 'month':{
                filterObject ={
                    createdAt:{
                        $gt:genDate(30)
                    }
                }
                order =-1
                break;
            }
            case 'all':{ 
                 order = -1
                 break;
            }

        }

        return {
            filterObject,
            order
        }

    }

    try {
        let  filter  = req.query.filter || 'latest';
        let currentPage = parseInt(req.query.page) || 1;
        let itemPerPage  = 2;

        let {order,filterObject} = genereteFilterObject(filter.toLowerCase());
        let bookmarks = [];

        if(req.user){
            let profile = await Profile.findOne(({user:req.user._id}))
            if(profile){
                bookmarks = profile.bookmark;
            }
        }

        let allPost = await Post.find(filterObject)
        .sort(order === 1? '-createdAt': 'createdAt')
        .populate('author','name')
        .skip((itemPerPage * currentPage) - itemPerPage)
        .limit(itemPerPage)

        let totalPost  = await Post.countDocuments();
        let totalPage = totalPost /itemPerPage;


         console.log(allPost);
        res.render('pages/explorers/explorers', {
            title: 'Explore All post',
            flashMessage: Flash.getMessage(req),
            filter,
            posts:allPost,
            itemPerPage,
            currentPage,
            totalPage,
            bookmarks
        })

    } catch (error) {
        next(error)
    }



}