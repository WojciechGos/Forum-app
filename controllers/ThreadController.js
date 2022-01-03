const Thread = require('../model/Thread')



async function threadPost(req, res){
    
    try{
        let title = req.body.title
        let result = await Thread.findOne({title:title})
        console.log(req.body)
        console.log(result)
        if(result == null){

            const thread = new Thread({
                title: title,
                description: req.body.description
            })

            await thread.save()
            res.status(200).send({ info: "thread is created" })
        }
        else{
            
            res.status(200).send({info:"thread is exist"})

        }
        
       
    }
    catch(e){
        console.error(e)
        res.status(500).send({error:"boo"})
    }
}


module.exports.threadPost = threadPost