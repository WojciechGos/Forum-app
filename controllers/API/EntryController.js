

const EntryReader = require('../../Utils/EntryHandler').EntryReader

function entryGet(req, res){

    // const date = new Date(req.params.date)
    // const index = req.params.index
    // const thread = req.params.thread
    console.log("entryGET: AAAA")
    const date = new Date("2022-02-12T21:18:31.269Z")
    const index = 1
    const thread = req.params.thread
    const entry = new EntryReader()
    let file_path = entry.getEntry(date, index)
    
    console.log(`entryGet: ${file_path}`)
    // res.sendFile(file_path)

    // entry.resond()
    // res.json({succes:true})

}

module.exports.entryGet = entryGet