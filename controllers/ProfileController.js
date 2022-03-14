const User = require('../model/User')


function profilePost(req, res){
    // console.log(req.file)
}                                       
function profilePut(req, res){

}


function profileGet(req, res){
    const name = req.params.username

    if(req.params.username === req.user.name){

    }

    
    res.render('profile', {user:req.user})

    
}



module.exports = {
    profileGet,
    profilePost,
    profilePut
}