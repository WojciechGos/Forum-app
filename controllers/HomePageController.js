const Data = require('../Utils/Data')

function homePageGet(req, res){
    Data.getMainUserData(req.user)
        .then((data)=>{
            res.render('index', {data: data})
        })
        .catch((e)=>{
            console.error(e)
        })
}

module.exports.homePageGet = homePageGet