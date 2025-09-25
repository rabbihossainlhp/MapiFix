require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const {useRoutes} = require("./Routes/Routes");
const {connect} = require("mongoose");
const cors = require("cors");



const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



//handle routing
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
    
