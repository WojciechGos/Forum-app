



function homePageGet(req, res){
    console.log(`homepage user: ${req.user}`)

    res.render('index', {user: req.user})
}

module.exports.homePageGet = homePageGet