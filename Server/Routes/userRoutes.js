const router = require('express').Router();
const {getAllUserController} = require('../Controllers/userController');
const {authMiddleware} = require('../Middlewares/authMiddleware');

router.get('', authMiddleware, getAllUserController);


module.exports = router;