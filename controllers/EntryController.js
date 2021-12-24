const Entry = require('../model/Entry')
const EntryHandler = require('../Utils/EntryHandler')
function entryPost(req, res){
  
    
    console.log(req.body.data)
    
    let tmp = new EntryHandler(req.body.data)
    
    
   
        
    const entry = new Entry({
        title: 'test1',
        content: req.body.data
    })
    try{
        // await entry.save()
    }catch(e){
        console.error(e)
    }
    // res.redirect('/entry', 200 ,{data: req.body.data})
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