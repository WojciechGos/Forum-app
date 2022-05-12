const {EntryWriter} = require('../Utils/EntryHandler')

async function commentPost(req, res){
    
    if(req.user){

        const comment = new EntryWriter(req.body, req.user)
        
        let response = await comment.saveComment(req.params.folder)
        res.json(response)
    }
    else{
        res.json({succes:false, info: "Nie jesteś zalogowany"})
    }
}

module.exports.commentPost = commentPost