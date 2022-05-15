const Entry = require('../model/Entry')
const EntryWriter = require('../Utils/EntryHandler').EntryWriter
const EntryReader = require('../Utils/EntryHandler').EntryReader
const fs = require('fs')

async function entryGet(req, res) {

    const date = new Date(req.params.date).toISOString()
    const index = parseInt(req.params.index, 10)
    const thread = req.params.thread

    console.log(`entryGET: Starts searching for an entry nr: ${index}`)

    const entry = new EntryReader()

    let response = await entry.getEntry(date, index, thread)
    console.log(response)
    res.json(response)
}


function entryPost(req, res){

    if(req.user != null){
        let entry = new EntryWriter(req.body, req.user)
        entry.saveEntry()
        console.log("added new entry!")
        res.json({succes:true, info:"Dodano nowy post"})
    }
    else{
        res.json({ succes: false, info: "Nie jesteś zalogowany" })
    }
   
}


module.exports.entryGet = entryGet
module.exports.entryPost = entryPost
