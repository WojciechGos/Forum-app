const EntryReader = require('../../Utils/EntryHandler').EntryReader
const fs = require('fs') 

async function entryGet(req, res){
    
    console.log("entryGET: Starts searching for an entry")
    const date = new Date(req.params.date).toISOString()
    const index = parseInt(req.params.index,10)
    const thread = req.params.thread

    

    const entry = new EntryReader()

    let response = await entry.getEntryData(date, index, thread) 
    res.json(response)
}   

module.exports.entryGet = entryGet