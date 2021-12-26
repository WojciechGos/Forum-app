const fs = require('fs')
const fetch = require('cross-fetch')
let uniqID = require('uniqid')
const path = require('path')
const jsdom = require('jsdom')
const Entry = require('../model/Entry')
const mongoose = require('mongoose')



module.exports = class EntryHandler{
    path = this._createDirectoryPath();  
    dom;
    user


    /*
        pass html content 
    **/
    constructor(content, user){
        this.dom = new jsdom.JSDOM(content.data)
        let id = mongoose.Types.ObjectId(user._id);
        console.log(id.valueOf())
    }

    /*
        save() is main function of EntryHandler 

   **/
    save() {
       
        let collection = this.dom.window.document.body
        
        let div, source, name
        
        for (let item of collection.getElementsByTagName('div')){

            div = item.getElementsByTagName('img')

            if(this._containImage(div)){

                source = div[0].src
                name = `${uniqID()}.${this._getExtension(source)}`
                this._injectNewNameToImageSource(name, item)

                // recognize type of images and save 
                if(this._isDataUri(source)){
                    this._saveUriImage(source, name)
                }else{
                    this._downloadAndSaveImage(source, name)
                }
            }
        }
        // It's saves updated content (renamed sources of images)
        this._saveEntryContent(collection.innerHTML)


        const entry = new Entry({
            path:this.path,
        })

    }
    /*
        It works because objects are passes by reference.
    **/
    _injectNewNameToImageSource(name, image){
        image.getElementsByTagName('img')[0].src = "http://localhost:5000/"+name
    }
    _isDataUri(image){
        if (image.substr(0, 5) == "data:")
            return true
        return false
    }


    _saveUriImage(uri, name){
        let buffer = Buffer.from(uri.split(',')[1], 'base64')
        this._saveImage(buffer, name)
    }

    async _downloadAndSaveImage(url, name){
        try{

            let buffer = await this._downloadImage(url)
            this._saveImage(buffer, name)
        }
        catch(e){
            console.error(e)
        }
    }
    /* 

    save Image to the path that is previously created

    **/

    async _saveImage(buffer, name) {
         
        let destinationPath = `${this.path}/${name}`
        fs.writeFile(destinationPath, buffer, (e) => {
            if (e)
                console.error(e)
        })

    }


    
    _containImage(content){
        if(content.length != 0)
            return true
        return false
    }
    
    async _downloadImage(link) {
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


    /*
        Saves entries as html because then i can replace image source 
        and use entry directy from this path without any modification
        
        Only one time i use it and I don't worry about it

    **/

    _saveEntryContent(content){
        let destinationPath = `${this.path}/${uniqID()}.html`
        fs.writeFile(destinationPath, content, (e)=>{
            if(e) console.error(e)
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

        Acquire extension of file. 

        It doesn't matter if source is url or base64 

    **/

    _getExtension(item) {
        if (item.slice(0, 5) == "data:") {
            return item.split(';')[0].split('/')[1]
        }
        return item.split('.').pop()
    }

   
    
}















