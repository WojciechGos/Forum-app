const {EntryWriter} = require('../Utils/EntryHandler')
const Comment = require('../model/Comment')
const Entry = require('../model/Entry')

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



async function commentGet(req, res) {


    let folder = req.params.folder
    let comments = await findCommentsByFolder(folder)
    console.log('comments', comments)


    res.json({ succes: true, data: comments })
}

async function findCommentsByFolder(folder) {
    try {
        let result = await Entry.findOne({ directoryId: folder })
            .populate({
                path: 'comment',
                populate: {
                    path: 'userId',
                    select: 'name'
                }
            })
            .select('comment')
        return result

    }
    catch (e) {
        console.error(e)

    }
}



module.exports.commentGet = commentGet
module.exports.commentPost = commentPost