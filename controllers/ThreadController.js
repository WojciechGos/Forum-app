const Thread = require('../model/Thread')

async function threadGet(req, res) {
    let threads
    try {
        threads = await Thread.find().select('title -_id')
        let response = { succes: true, data: threads }
        console.log(response)
        res.json(response)
    }
    catch (e) {
        console.error(e)
        res.json({ succes: false, info: "nie można pobrać wątków" })
    }

}






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
module.exports.threadGet = threadGet