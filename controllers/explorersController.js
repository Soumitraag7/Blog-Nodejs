const Post = require('../models/Post')
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
        let  filter  = req.query.filter || 'latest'
        console.log(filter);
        let {order,filterObject} = genereteFilterObject(filter.toLowerCase())
        console.log(filterObject,order);

        let allPost = await Post.find(filterObject)
        .sort(order === 1? '-createdAt': 'createdAt')
         .populate('author','name')

         console.log(allPost);
        res.render('pages/explorers/explorers', {
            title: 'Explore All post',
            flashMessage: Flash.getMessage(req),
            filter: filter ,
            posts:allPost
        })

    } catch (error) {
        next(error)
    }



}