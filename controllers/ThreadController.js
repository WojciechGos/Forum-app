const Thread = require('../model/Thread')

async function threadPost(req, res){
    console.log(req.body)
    try{
        const thread = new Thread({
            title: req.body.title,
            description: req.body.description
        })
        console.log(thread)
        await thread.save()
    }
    catch(e){
        console.error(e)
    }
}


module.exports.threadPost = threadPost