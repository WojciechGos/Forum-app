const Entry = require('../model/Entry')
const EntryHandler = require('../Utils/EntryHandler')
function entryPost(req, res){
  
    
    if(req.user != null){

        let entry = new EntryHandler(req.body, req.user)
        entry.save()
        res.json({succes:true, info:"Dodano nowy post"})
    }
    
   
}
async function entryGet(req, res){
    try{

        const entry = await Entry.findOne({title:'test1'})
        res.render('tmp2', { data: entry })
    }catch(e){
        console.error(e)
    }
  
}


module.exports.entryPost = entryPost
module.exports.entryGet = entryGet