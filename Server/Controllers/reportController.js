const Report = require('../Models/Report');
const User = require('../Models/User');


exports.createReportController = async (req, res, next) => {        
    const {title, description, status, priority, location, reporter} = req.body;
    const reportImage = req.file? req.file.path : 'example.jpg';
    try{

        if(!title || !status || !priority ||  !reporter){
            return res.status(400).json({
                message: "Title, Status, Priority and Reporter are required"
            });
        }

        const newReport = new Report({
            title,
            description,
            status,
            priority,
            location,
            reporter: req.user._id,
            image: reportImage
        })

        await newReport.save();

        return res.status(201).json({
            message: "Report created successfully",
            report: newReport
        });


    }catch(err){
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}





exports.getUserReportsController = async (req, res, next) => {
    try{
        const reports = await Report.find({reporter: req.user._id}).populate('reporter', 'name email');
        return res.status(200).json({
            message: "User reports fetched successfully",
            reports
        });
    }catch(err){
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}