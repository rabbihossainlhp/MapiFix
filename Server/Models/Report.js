const {Schema,model} = require("mongoose");

const reportSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,

    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },

    status: {
        type: String,
        enum: ['open', 'in progress', 'resolved'],
        default: 'open',
        required: true,
    },

    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
        required: true,
    },

    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: 300,
    },

    reporter: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    image: {
        type: String,
        default: "https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg",
    }

}, {timestamps: true});



const Report = model("Report", reportSchema);
module.exports = Report;