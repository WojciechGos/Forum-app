const EntryReader = require('../../Utils/EntryHandler').EntryReader
const fs = require('fs') 


async function entryGet(req, res){

    // const date = new Date(req.params.date)
    // const index = req.params.index
    // const thread = req.params.thread
    console.log("entryGET: AAAA")
    const date = new Date("2022-02-14T09:44:55.501Z")
    const index = 1
    const thread = 'undefined'

    const entry = new EntryReader(date, index, thread)


  

   

}

module.exports.entryGet = entryGet