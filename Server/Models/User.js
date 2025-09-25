const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    role:{
        type: String,
        enum: ['teacher', 'student'],
        default: 'student',
        required: true,
    },
    
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },

    department: {
        type: String,
        trim: true,
        maxlength: 200,
    },

    rollnumber: {
        type: Number,
        unique: true,
        sparse: true, 
        min: 1,
        trim: true,
    },

    reports:[
        {
            type: Schema.Types.ObjectId,
            ref: "Report",
        }
    ]

}, {timestamps: true})


const User = model("User", userSchema);
module.exports = User;