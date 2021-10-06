const User = require('../model/User')
const Data = require('../Utils/Data')

function profilePost(req, res){
    // console.log(req.file)
}                                       
function profilePut(req, res){

}


async function profileGet(req, res){
    const name = req.params.username

    if(req.params.username === req.user.name){

    }
    
    if(getUser(name)){
        // todo write if statement to check if user and mainUser is the same 
        try {
            console.log(name)
            let userData = await Data.getUserData(name)

            let mainUserData = await Data.getMainUserData(req.user)

            let data = userData 
            Object.assign(data, mainUserData)
          
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