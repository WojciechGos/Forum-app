const path = require('path')

// let path = `${process.env.PATH}/Data/Entries`

async function imageApiGet(req, res){

    

    let imagePath = `${__dirname}/../../Data/Entries/${req.params.folder}/${req.params.name}`

    res.sendFile(path.resolve(imagePath))
}

module.exports.imageApiGet = imageApiGet