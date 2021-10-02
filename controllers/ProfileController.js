const User = require('../model/User')
const Data = require('../Utils/Data')

function profilePost(req, res){
    console.log(req.file)
}                                       
function profilePut(req, res){

}


async function profileGet(req, res){
    const isOwner = req.user.name == req.params.username
    console.log(req.user)
    // todo: replace arguments to exact data that UserPermissions need
    if(getUser(req.params.username)){
        try {
            let data = await Data.getUserData(req.params.username)
            res.render('Profile/profile', {data:data})
        } catch (error) {
            console.error(error)
        }
    }

    
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