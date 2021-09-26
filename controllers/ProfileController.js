const User = require('../model/User')
const UserPermisions = require('../Utils/UserPermissions')

function profilePost(req, res){
    console.log(req.file)
}                                       
function profilePut(req, res){

}


function profileGet(req, res){
    const isOwner = req.user.name == req.params.username
    console.log(req.user)
    if(getUser(req.params.username))
        res.render('Profile/profile', {data:UserPermisions.getData(req), isOwner:isOwner})
    
}

async function getUser(username){

    try{
        return await User.findOne({name:username})

    }catch(e){
        console.error(e)
    }
}

module.exports = {
    profileGet,
    profilePost,
    profilePut
}