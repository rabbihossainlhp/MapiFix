const multer = require('multer');
const path = require('path');
const {storage} = require('../Config/cloudinary');


const upload = multer({
    storage,
    limits: {fileSize: 9 * 1024 * 1024}, 

    fileFilter: (req, file, cb)=>{
        const fileTypes = /jpeg|jpg|png|webp/;
        const mimeType = fileTypes.test(file.mimetype);
        const extname = path.extname(file.originalname).toLowerCase();
        
        if(mimeType && extname){
            return cb(null, true);
        }else{
            cb('File type not supported');
        }
    }
})



module.exports = upload;