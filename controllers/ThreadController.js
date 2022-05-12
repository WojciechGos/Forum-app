const Thread = require('../model/Thread')



async function threadPost(req, res){
    
    try{
        let title = req.body.title
        let result = await Thread.findOne({title:title})

        if(result == null){
            const thread = new Thread({
                title: title,
                description: req.body.description
            })
            await thread.save()
            res.json({succes:true, info:"Dodano wątek", redirect:'/'}) 
        }
        else{ 
            res.status(200).send({info:"Wątek już istnieje"})
        }
    }
    catch(e){
        console.error(e)
    }
}


module.exports.threadPost = threadPost