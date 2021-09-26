const ejs = require('ejs')
const UserPermisions = require('../Utils/UserPermissions')

function homePageGet(req, res){
    
    res.render('index', {data: UserPermisions.getData(req)})
}

module.exports.homePageGet = homePageGet