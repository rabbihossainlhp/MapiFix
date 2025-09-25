const User = require('../Models/User');
const jwt = require('jsonwebtoken');


exports.authMiddleware = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if(!authHeader || !token){
        return res.status(401).json({message: "Authentication failed"});
    }

    try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        req.user = user;
        next();

    }catch(error){
        return res.status(401).json({message: "Authentication failed"});
    }
}