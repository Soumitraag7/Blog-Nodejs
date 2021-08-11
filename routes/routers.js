const authRouter = require('./authRoute')
const dashboardRouter = require('./dashboardRouter')
const playgroundRouter = require('../playground/validator')
const uploadRouter = require('./uploadRouter')


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
    }
    ,{
        path:"/",
        handler:(req, res) => {
            res.send('working')
        
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

