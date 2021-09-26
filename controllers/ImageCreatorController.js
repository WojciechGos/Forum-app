const createProfileImage = require('../Utils/DiceBear').createProfileImage

function ImageCreatorGet(req, res){
    const seed = req.params.seed
    const svg = createProfileImage(seed)
    console.log(seed)
    res.send(svg)
}

module.exports = {
    ImageCreatorGet
}
