require('dotenv').config({path: '../.env'});
const Admin = require('../Models/Admin');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');



const createAdmin = async (username, email, password) => {
    try{

        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin){
            console.log("This Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            username,
            email,
            password: hashedPassword,
        });

        await newAdmin.save();
        console.log("Admin created successfully");


    }catch(error){
        console.error("Error creating admin:", error);
    }finally{
        await mongoose.connection.close();
        console.log("Database connection closed");
        process.exit(0);
    }
}


createAdmin('admin','admin@mapifix.com','mapifix@admin');