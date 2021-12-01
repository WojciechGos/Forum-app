const Entry = require('../model/Entry')
const fs = require('fs')


async function entryPost(req, res){
    // console.log(req.body.images)
    let images = req.body.images
    let file
    images.forEach(item =>{
        console.log(item)
        if(item.substr(0, 5) == "data:"){
            
            let buffer = Buffer.from(item.split(',')[1], 'base64')
            let path = `${__dirname}/../Images/Post/${Date.now()}.png`
            fs.writeFile(path, buffer, (e)=>{
                console.error(e)
            })
        }
       
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