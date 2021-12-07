const Entry = require('../model/Entry')
let uniqID = require('uniqid')











function entryPost(req, res){
  
    let images = req.body.images
    let id = uniqID(), i=0, extension
    let path = `${__dirname}/../Images/Post/` + id + '/'
    
    
    
    images.forEach((item) =>{
        
        if(item.substr(0, 5) == "data:"){

            let buffer = Buffer.from(item.split(',')[1], 'base64')
            saveFile(path, buffer)
        }else{
            
            downloadAndSave(item,path, i)
        }
        i++
        
       
    })
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