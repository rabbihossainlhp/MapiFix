require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const {useRoutes} = require("./Routes/Routes");
const {connect} = require("mongoose");
const cors = require("cors");



const app = express();

app.use(cors({
    origin: true, 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//handle routing
app.get('/', (req, res) => {
    res.json({
        message: 'MapiFix API is running successfully!',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Set up routes FIRST
useRoutes(app);

// 404 handler comes LAST
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
        path: req.originalUrl,
        method: req.method
    });
});


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
    
