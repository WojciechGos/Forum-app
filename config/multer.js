const multer = require('multer')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, '../Images/Profiles')
    },
    filename: (req, file, cb) =>{
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({storage:fileStorageEngine})

module.exports.upload = upload