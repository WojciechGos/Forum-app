const ejs = require('ejs')
const UserPermisions = require('../UserPermissions')

function homePageGet(req, res){
    
    res.render('index', {data: UserPermisions.getData(req)})
}

module.exports.homePageGet = homePageGet