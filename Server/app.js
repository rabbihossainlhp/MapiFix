require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const {useRoutes} = require("./Routes/Routes");
const {connect} = require("mongoose");
const cors = require("cors");



const app = express();

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://your-frontend-domain.vercel.app']
        : ['http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//handle routing
app.get('/', (req, res) => {
    res.send('Welcome to the MapiFix API');
});

app.use((req, res) => {
    res.status(404).json({message: "Route not found",path: req.originalUrl});
});

useRoutes(app);


const Port = process.env.PORT || 5000;
const Mongo_url = process.env.MONGODB_URL;



//lets connecting to database then start the server
connect(Mongo_url).then(()=>{
    console.log("Database connected successfully");
    console.log("Starting the server");

    app.listen(Port,()=>{
        console.log(`server is running http://localhost:${Port}`);
    })
}).catch((err)=>{
    console.log("Database connection failed");
    console.log(err)
})
    
