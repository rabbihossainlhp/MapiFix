const router = require('express').Router();
const {
    createReportController, 
    getUserReportsController,
    getAllReportsController,
    updateReportStatusController
} = require('../Controllers/reportController');
const upload = require('../Middlewares/uploadMiddleware');
const {authMiddleware} = require('../Middlewares/authMiddleware');



router.post('/create', authMiddleware, upload.single('reportImage'), createReportController);
router.post('/updatestatus/:reportId', authMiddleware, updateReportStatusController)
router.get('/user-reports', authMiddleware, getUserReportsController);
router.get('/allreports', authMiddleware, getAllReportsController);


module.exports = router;