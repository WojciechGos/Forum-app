const Comment = require('../../model/Comment')
const Entry = require('../../model/Entry')


async function commentGet(req, res){
    let folder = req.params.folder
    let comments = await findCommentsByFolder(folder)
    console.log('comments', comments)


    res.json({ succes: true, data: comments})
}

async function findCommentsByFolder(folder){
    try{
        let result = await Entry.findOne({ directoryId: folder })
        .populate({ 
            path: 'comment',
            populate:{
                path: 'userId',
                select: 'name'
            }
        })
        .select('comment')
        return result

    }
    catch(e){
        console.error(e)

    }
}

async function findCommentsByIds(identyficators){

    // try{
    //     let result = await Comment.find({ '_id': { $in: identyficators } });

    //     return result
    // }
    // catch(e){
    //     console.error(e)
    // }
}

module.exports.commentGet = commentGet

