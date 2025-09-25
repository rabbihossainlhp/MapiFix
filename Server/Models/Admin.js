const {Schema,model} = require("mongoose");

const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 100,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    }
}, {timestamps: true});


const Admin = model("Admin", adminSchema);
module.exports = Admin;
