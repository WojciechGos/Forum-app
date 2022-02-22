const EntryReader = require('../../Utils/EntryHandler').EntryReader
const fs = require('fs') 


async function entryGet(req, res){

    const date = new Date(req.params.date).toISOString()

    // const index = req.params.index
    // const thread = req.params.thread
    
    console.log("entryGET: Starts searching for an entry")
    const index = 1
    const thread = "motoryzacja"
    
    console.log(`date client: ${date}`)
    
    const entry = new EntryReader()
    let response = await entry.getEntryData(date, index) 
    console.log(response)
    res.json(response)
}   

module.exports.entryGet = entryGet