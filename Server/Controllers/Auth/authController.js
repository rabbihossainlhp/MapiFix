const User = require("../../Models/User");
const Admin = require("../../Models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




exports.signupController = async (req, res, next) => {
    try {
        const {username, email, password, role, department, rollnumber} = req.body;
        const exsistingUser = await User.findOne({email});
        if(exsistingUser){
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role,
            department,
            rollnumber: role === 'student' ? rollnumber : undefined,
        })

        await newUser.save();
        return res.status(201).json({
            message: "User registered successfully",
            user: newUser
        });

    }catch (error) {
        return res.status(500).json({
            message: "Server Error", 
            error: error.message 
        });
    }
}




exports.loginController = async (req, res, next) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            const admin = await Admin.findOne({email});
            if(!admin){
                return res.status(400).json({
                    message: "Invalid email or password"
                });
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if(!isPasswordValid){
                return res.status(400).json({
                    message: "Invalid email or password"
                });
            }

            const JWT_Token = jwt.sign(
                {userId: admin._id, role: 'admin'},
                process.env.JWT_SECRET,
                {expiresIn: '1d'}
            );

            return res.status(200).json({
                message: "Login successful",
                token: JWT_Token,
                user: admin
            })
        }




        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        const JWT_Token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        return res.status(200).json({
            message: "Login successful",
            token: JWT_Token,
            user
        });

    }catch(err){
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}