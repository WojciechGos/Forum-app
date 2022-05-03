const Thread = require('../../model/Thread')

async function threadGet(req, res){
    let threads
    try{
        threads = await Thread.find().select('title -_id')
        let response = { succes: true, data: threads }
        console.log(response)
        res.json(response)
    }
    catch(e){
        console.error(e)
        res.json({succes:false, info:"nie można pobrać wątków"})
    }

}


module.exports.threadGet = threadGet