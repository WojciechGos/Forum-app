const Entry = require('../model/Entry')

async function entryPost(req, res){
    console.log(req.body.images)
    let images = req.body.images
    images.forEach(item =>{
        console.log(item)
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