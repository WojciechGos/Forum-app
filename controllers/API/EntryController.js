const EntryReader = require('../../Utils/EntryHandler').EntryReader
const fs = require('fs') 

async function entryGet(req, res){
        
    const date = new Date(req.params.date).toISOString()
    const index = parseInt(req.params.index,10)
    const thread = req.params.thread
    
    console.log(`entryGET: Starts searching for an entry nr: ${index}`)

    const entry = new EntryReader()

    let response = await entry.getEntry(date, index, thread) 
    console.log(response)
    res.json(response)
}   

module.exports.entryGet = entryGet