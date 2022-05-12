const Entry = require('../model/Entry')
const EntryWriter = require('../Utils/EntryHandler').EntryWriter

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


module.exports.entryPost = entryPost
