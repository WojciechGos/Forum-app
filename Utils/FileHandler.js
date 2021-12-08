const fs = require('fs')
const fetch = require('cross-fetch')
let uniqID = require('uniqid')


class FileHandler{
    path = _createEntryPath();
    constructor(postData){

    }
    saveEntryImages(images) {
        let name = _nameGenerator(), extension, name
        let path = _createEntryPath() // possible error
        images.forEach((item) => {
            extension = getExtension(item)
            name = path + name.netx() + '.' + extension
            if (item.substr(0, 5) == "data:") {
                let buffer = Buffer.from(item.split(',')[1], 'base64')
                saveFile(name, buffer)
            } else {
                downloadAndSave(item, name)
            }
        })
    }

    _getImages(){

    }

    
    _createEntryPath() {
        let id = uniqID()
        let path = `${__dirname}/../Data/Entries/` + id + '/'
        fs.mkdir(path, (e) => {
            if (e)
                console.error(e)
        })
        return path
    }

    * _nameGenerator() {
        let i = 0
        while (true)
            yield i++
    }
    _getExtension(item) {
        if (item.substr(0, 5) == "data:") {
            return item.split(';')[0].split('/')[1]
        }
        return item.split('.').pop()

    }
    async _downloadFile(link) {
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
    _saveFile(path, buffer) {

        fs.writeFile(path, buffer, (e) => {
            if (e)
                console.error(e)
        })
    }
    async _downloadAndSave(item, path) {
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

}

module.exports.saveHTML = function saveHTML(){

}






