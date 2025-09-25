const express = require("express");
const morgan = require("morgan");


const app = express();
app.use(morgan("dev"));

app.listen(5000,()=>{
    console.log(`server is running http://localhost:5000`);
})