



function homePageGet(req, res){

    res.render('index', {userPermission: req.user})
}

module.exports.homePageGet = homePageGet