const fs = require('fs')
const fetch = require('cross-fetch')
let uniqID = require('uniqid')
const path = require('path')
const jsdom = require('jsdom')




module.exports = class EntryHandler{
    path = this._createDirectoryPath();

    /*



    **/

    constructor(content){

        const collection = this._getImages(content)

        for(item of collection){

        }


    }

    /*

   **/
    _getImages(content) {
        const dom = new jsdom.JSDOM(content)
        const editableDiv = dom.getElementById('createPostForm')
        const collection = editableDiv.getElementByTagName('div')
        let images
        for(let item of collection){
            let tmp = item.getElementByTagName('img')
            if(tmp.length != 0){
                images.push(tmp[0])
            }
        }
        return images
    }
    




    /*
        Saves entries as html because then i can replace image source 
        and use entry directy from this path without any modification
        
        Only one time i use it and I don't worry about it

    **/

    saveEntryContent(content){
        let destinationPath = `${path}/${uniqID()}.html`
        fs.writeFile(destinationPath, content, (e)=>{
            console.error(e)
        })
    }

    /* 
    
        create Directory path for entry content and images

    **/

    _createDirectoryPath() {
        let id = uniqID()
        let path = `${__dirname}/../Data/Entries/` + id
        fs.mkdir(path, (e) => {
            if (e)
                console.error(e)
        })
        return path
    }
 

    /* 

        save Image to the path that is previously created

    **/

    async _saveImage(item) {
        try{
            let destinationPath = `${path}/${uniqID()}.${_getExtension(item)}`
            let buffer = await downloadFile(item)
            fs.writeFile(destinationPath, buffer, (e) => {
                if (e)
                console.error(e)
            })
        }catch(e) { console.error(e) }
    }

    /*

        Acquire extension of file. 

        It doesn't matter if source is url or base64 

    **/

    _getExtension(item) {
        if (item.substr(0, 5) == "data:") {
            return item.split(';')[0].split('/')[1]
        }
        return item.split('.').pop()
    }

   
    
}



// function saveEntryImages(images) {
//     let name = _nameGenerator(), extension, name
//     let path = _createEntryPath() // possible error
//     images.forEach((item) => {
//         extension = getExtension(item)
//         name = path + name.netx() + '.' + extension
//         if (item.substr(0, 5) == "data:") {
//             let buffer = Buffer.from(item.split(',')[1], 'base64')
//             saveFile(name, buffer)
//         } else {
//             downloadAndSave(item, name)
//         }
//     })
// }



async function downloadFile(link) {
    try {

        return await fetch(link, {
            method: 'GET'
        })
            .then(async (response) => {
                return await response.buffer()
            })

    } catch (e) {
        console.error(e)
    }
}





module.exports.saveHTML = function saveHTML(){

}






