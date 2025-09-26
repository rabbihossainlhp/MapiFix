const User = require('../Models/User');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin');  


exports.authMiddleware = async (req, res, next) =>{
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    if(!authHeader || !token){
        return res.status(401).json({message: "Authentication failed"});
    }

    try{
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET);
        
        if(decodedToken.role === 'admin'){
            const admin = await Admin.findById(decodedToken.userId);
            if(!admin){
                return res.status(404).json({message: "Admin not found"});
            }
            req.user = admin;
            return next();
        }else{
            const user = await User.findById(decodedToken.userId);
            if(!user){
                return res.status(404).json({message: "User not found"});
            }

            req.user = user;
            next();
        }
        

    }catch(error){
        return res.status(401).json({message: "Authentication failed"});
    }
}