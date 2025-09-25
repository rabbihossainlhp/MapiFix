const User = require('../Models/User');

exports.getAllUserController= async (req, res, next) => {
    try{
        const users = await User.find();
        return res.status(200).json({
            message: "Users fetched successfully",
            users
        });
    }catch(error){
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
}