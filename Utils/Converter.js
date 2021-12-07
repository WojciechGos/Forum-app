const fs = require('fs')
const fetch = require('cross-fetch')
let uniqID = require('uniqid')

class Converter {
    constructor(item){

    }
    convertAndSave(){
        
    }
}

function createPostPath(){
    fs.mkdir(path, (e) => {
        if (e)
            console.error(e)
    })
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

async function downloadAndSave(item, path, i) {
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