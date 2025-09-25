//dependencies
const authRouter = require('./authRoutes');
const reportRouter = require('./reportRoutes');
const userRouter = require('./userRoutes');




const Router_array = [
    {
        path: '/api/user',
        handler: authRouter
    },
    {
        path: '/api/report',
        handler: reportRouter
    },
    {
        path: '/api/alluser',
        handler: userRouter
    }

];


exports.useRoutes = (app) =>{
    Router_array.map((route)=>{
        app.use(route.path, route.handler);
    })
}