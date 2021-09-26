const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './Images/Profiles/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + req.user.name)
    }
})
const upload = multer({storage:fileStorageEngine})

function fileFilter(req, file, cb){
    
}

module.exports.upload = upload