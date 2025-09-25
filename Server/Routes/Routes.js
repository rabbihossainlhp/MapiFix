//dependencies
const authRouter = require('./authRoutes');
const reportRouter = require('./reportRoutes');




const Router_array = [
    {
        path: '/api/user',
        handler: authRouter
    },
    {
        path: '/api/report',
        handler: reportRouter
    }

];


exports.useRoutes = (app) =>{
    Router_array.map((route)=>{
        app.use(route.path, route.handler);
    })
}