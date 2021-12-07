const fs = require('fs')
const fetch = require('cross-fetch')
let uniqID = require('uniqid')

module.exports.save = function save(images){
    let name = nameGenerator(), extension
    let path = createPostPath() // possible error
    images.forEach((item)=>{
        extension = getExtension(item)
        if (item.substr(0, 5) == "data:") {
            let buffer = Buffer.from(item.split(',')[1], 'base64')
            saveFile(path + name.netx() + '.' + extension, buffer)
        }else{
            downloadAndSave(item, path + name.netx() + '.' + extension )
        }
    })

}
function* nameGenerator(){
    let i = 0
    while(true)
        yield i++
}

function createPostPath(){
    let id = uniqID()
    let path = `${__dirname}/../Images/Post/` + id + '/'
    fs.mkdir(path, (e) => {
        if (e)
            console.error(e)
    })
    return path
}

function getExtension(item) {
    if (item.substr(0, 5) == "data:") {
        return item.split(';')[0].split('/')[1]
    }
    return item.split('.').pop()

}



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

function saveFile(path, buffer) {

    fs.writeFile(path, buffer, (e) => {
        if (e)
            console.error(e)
    })
}

async function downloadAndSave(item, path) {
    try {
        let buffer = await downloadFile(item)
        console.log(i)
        console.log(item)
        console.log(path)
        console.log(buffer)
        saveFile((path), buffer)

    } catch (e) {
        console.error(e)
    }
}