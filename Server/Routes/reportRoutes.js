const router = require('express').Router();
const {createReportController, getUserReportsController} = require('../Controllers/reportController');
const upload = require('../Middlewares/uploadMiddleware');
const {authMiddleware} = require('../Middlewares/authMiddleware');

router.get('/user-reports', authMiddleware, getUserReportsController);
router.post('/create', authMiddleware, upload.single('reportImage'), createReportController);


module.exports = router;