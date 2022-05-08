function homePageGet(req, res){
    res.render('index', {user: req.user})
}

module.exports.homePageGet = homePageGet