

let path = `${process.env.PATH}/Data/Entries`

async function imageApiGet(req, res){

    console.log(req.params)
    // console.log(path)

    let imagePath = `${__dirname}/../../Data/Entries/${req.params.folder}/${req.params.name}`

    console.log(imagePath)
    res.sendFile(imagePath)
}

module.exports.imageApiGet = imageApiGet