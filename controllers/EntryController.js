const Entry = require('../model/Entry')
const fs = require('fs')
let uniqID = require('uniqid')
const fetch = require('cross-fetch')
const { response } = require('express')


function getExtension(item){
    if (item.substr(0, 5) == "data:") {
        return item.split(';')[0].split('/')[1]
    }
    return item.split('.').pop()

}

async function downloadFile(link, i){
    try{

        return await fetch(link, {
            method: 'GET'
        })
        .then(response=> {
            response.blob()})
        .then(blob =>{
            return new File([blob], `${i}.${getExtension(link)}`)
        })
    }catch(e){
        console.error(e)
    }
}

function entryPost(req, res){
    // console.log(req.body.images)
    let images = req.body.images
    let id = uniqID(), i=0, extension
    let path = `${__dirname}/../Images/Post/${id}`
    fs.mkdir(path, (e)=>{
        if(e)
            console.error(e)
    })
    
    images.forEach(item =>{
        extension = getExtension(item)
        path = `${__dirname}/../Images/Post/${id}/${i}.${extension}`

        console.log(path)
        if(item.substr(0, 5) == "data:"){
            let buffer = Buffer.from(item.split(',')[1], 'base64')
            fs.writeFile(path, buffer, (e)=>{
                if(e)
                    console.error(e)
            })
        }else{
            console.log(downloadFile(item, i))
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