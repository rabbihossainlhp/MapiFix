const Report = require('../Models/Report');
const User = require('../Models/User');


exports.createReportController = async (req, res, next) => {        
    const {title, description, status, priority, location, reporter} = req.body;
    const reportImage = req.file? req.file.path : 'https://png.pngtree.com/png-vector/20191004/ourmid/pngtree-alert-icon-isolated-on-abstract-background-png-image_1779868.jpg';
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
        await User.findByIdAndUpdate(req.user._id, {$push: {reports: newReport._id}});

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
        const reports = await Report.find({reporter: req.user._id})
        .populate('reporter', 'name email')
        .sort({createdAt: -1});

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





exports.getAllReportsController = async (req, res, next) => {
    try{
        const reports = await Report.find()
            .populate('reporter', 'username email')
            .sort({createdAt: -1});
        return res.status(200).json({
            message: "All reports fetched successfully",
            reports
        });


    }catch(err){
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }

}   



exports.updateReportStatusController = async (req, res, next) => {
    const {reportId} = req.params;
    const {status} = req.body;

    try{
        if(!status){
            return res.status(400).json({
                message: "Status is required"
            });
        }

        const report = await Report.findById(reportId);
        if(!report){
            return res.status(404).json({
                message: "Report not found"
            });
        }

        report.status = status;
        await report.save();

        return res.status(200).json({
            message: "Report status updated successfully",
            report
        });

        
    }catch(err){
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}






exports.getSingleReportController = async (req, res, next) => {
    const {reportId} = req.params;
    try{
        const report = await Report.findById(reportId)
            .populate('reporter', 'username email');
        if(!report){
            return res.status(404).json({
                message: "Report not found"
            });
        }

        return res.status(200).json({
            message: "Report fetched successfully",
            report
        });

        
    }catch(err){
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        });
    }
}