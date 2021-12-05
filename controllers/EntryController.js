const fetch = require('cross-fetch')
const Entry = require('../model/Entry')
const fs = require('fs')
let uniqID = require('uniqid')
const { response } = require('express')


let path = {
    postDirectory,
    createPath(){
        let id = uniqID()
        postDirectory = `${__dirname}/../Images/Post/` + id + '/'
    }
}


function getExtension(item){
    if (item.substr(0, 5) == "data:") {
        return item.split(';')[0].split('/')[1]
    }
    return item.split('.').pop()

}


async function downloadFile(link){
    try{
        
        return await fetch(link, {
            method: 'GET'
        })
        .then(async (response)=> {
            return await response.buffer()
        })
        
    }catch(e){
        console.error(e)
    }
}

function saveFile(path, buffer) {

    fs.writeFile(path, buffer, (e) => {
        if (e)
            console.error(e)
    })   
}

// function createPath(item, i){
//     let extension = getExtension(item)
// }
async function downloadAndSave(item, path, i){
    try {
        let extension = getExtension(item)
        let buffer = await downloadFile(item)
        console.log(i)
        console.log(item)
        console.log(path)
        console.log(buffer)

        saveFile((path + i + '.' + extension), buffer)
    } catch (e) {
        console.error(e)
    }

}
function entryPost(req, res){
    // console.log(req.body.images)
    let images = req.body.images
    let id = uniqID(), i=0, extension
    let path = `${__dirname}/../Images/Post/` + id + '/'
    
    fs.mkdir(path, (e)=>{
        if(e)
            console.error(e)
    })
    
    images.forEach((item) =>{
        
        if(item.substr(0, 5) == "data:"){
            i++
            console.log(i)
            console.log(path)
            let buffer = Buffer.from(item.split(',')[1], 'base64')
            saveFile(path, buffer)
        }else{
           downloadAndSave(item,path, i)
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