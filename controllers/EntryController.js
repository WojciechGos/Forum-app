const Entry = require('../model/Entry')
const EntryWriter = require('../Utils/EntryHandler').EntryWriter
function entryPost(req, res){
  
    console.log(req.body)
    if(req.user != null){

        let entry = new EntryWriter(req.body, req.user)
        entry.save()
        console.log("added new entry!")
        res.json({succes:true, info:"Dodano nowy post"})
    }
    
   
}


module.exports.entryPost = entryPost
