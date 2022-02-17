const EntryReader = require('../../Utils/EntryHandler').EntryReader
const fs = require('fs') 

async function entryGet(req, res){

    // const date = new Date(req.params.date)
    // const index = req.params.index
    // const thread = req.params.thread
    console.log("entryGET: AAAA")
    const date = new Date("2022-02-14T09:44:55.501Z")
    const index = 1
    const thread = req.params.thread
    const entry = new EntryReader()
    let file_path = await entry.getEntry(date, index)
    let response = {}
    
    console.log(`entryGet: ${file_path}`)
    fs.readFile(file_path, (err, data)=>{
        if(err)
            console.error(err)
        
        console.log(data.toString())            
    })
    // res.sendFile(file_path)

    // entry.resond()
    // res.json({succes:true})

}

module.exports.entryGet = entryGet