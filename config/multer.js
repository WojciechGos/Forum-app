const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './Images/Profiles/')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + req.user.name)
    }
})
const upload = multer({storage:fileStorageEngine._handleFile, limits: {fieldSize : 25*1024*1024}})

module.exports.upload = upload