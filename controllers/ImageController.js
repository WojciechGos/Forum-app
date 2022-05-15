const createProfileImage = require('../Utils/DiceBear').createProfileImage

const path = require('path')

async function imageGet(req, res) {

    let imagePath = `${__dirname}/../Data/Entries/${req.params.folder}/${req.params.name}`

    res.sendFile(path.resolve(imagePath))
}


function imageCreatorGet(req, res){
    const seed = req.params.seed
    const svg = createProfileImage(seed)
    res.send(svg)
}

module.exports = {
    imageCreatorGet,
    imageGet
}
