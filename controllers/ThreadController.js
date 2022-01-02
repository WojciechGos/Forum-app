const Thread = require('../model/Thread')

async function threadPost(req, res){
    try{
        const thread = new Thread({
            title: req.body.title,
            description: req.body.description
        })
        console.log(`thread obj ${thread} `)
        await thread.save()
    }
    catch(e){
        console.error(e)
        res.status(500).send({error:"boo"})
    }
}


module.exports.threadPost = threadPost