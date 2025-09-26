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
        default: "https://png.pngtree.com/png-vector/20191004/ourmid/pngtree-alert-icon-isolated-on-abstract-background-png-image_1779868.jpg",
    }

}, {timestamps: true});



const Report = model("Report", reportSchema);
module.exports = Report;