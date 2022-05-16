const createProfileImage = require('../Utils/DiceBear').createProfileImage

const path = require('path')

function imageGet(req, res) {

    let imagePath = `${__dirname}/../Data/Entries/${req.params.folder}/${req.params.name}`

    res.sendFile(path.resolve(imagePath))
}



function imageCreatorGet(req, res){
    const seed = req.params.seed
    const svg = createProfileImage(seed)
    res.send(svg)
}

function profileImageGet(req, res){
    let imagePath = `${__dirname}/../Data/Profiles/${req.params.name}-avatar.svg`
    console.log('test')
    res.sendFile(path.resolve(imagePath))
}

module.exports = {
    imageCreatorGet,
    imageGet,
    profileImageGet
}
