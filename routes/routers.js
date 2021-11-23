const authRouter = require('./authRoute')
const dashboardRouter = require('./dashboardRouter')
const playgroundRouter = require('../playground/validator')
const uploadRouter = require('./uploadRouter')
const postRouter = require('./postRouter')
const commentsRouter = require('../api/routers/commentsRouter')
const explorerRoute = require('./explorerRouter')


console.log();
const routers = [
    {
        path:'/auth',
        handler: authRouter
    },
    {
        path:'/dashboard',
        handler: dashboardRouter
    },
    {
        path:"/playground",
        handler: playgroundRouter
    },
    {
        path:'/uploads',
        handler:uploadRouter
    },
    {
        path:'/post',
        handler:postRouter
    },
    {
        path:'/api',
        handler:commentsRouter
    },
    {
        path:'/explorers',
        handler:explorerRoute
    }
    ,{
        path:"/",
        handler:(req, res) => {
            res.redirect('/explorers')
        
        }
    }
];


module.exports = (app) =>{
    routers.forEach((router)=>{
        if(router.path === '/'){
            app.get(router.path,router.handler)
        }else{
            app.use(router.path,router.handler);

        }
    })
}

