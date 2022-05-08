const {EntryWriter} = require('../Utils/EntryHandler')

async function commentPost(req, res){

    const comment = new EntryWriter(req.body, req.user)
    
    let response = await comment.saveComment(req.params.folder)
    res.json(response)
}

module.exports.commentPost = commentPost