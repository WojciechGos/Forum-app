const fs = require('fs')
const fetch = require('cross-fetch')
let uniqID = require('uniqid')
const path = require('path')
const jsdom = require('jsdom')




module.exports = class EntryHandler{
    // path = this._createDirectoryPath();  
    dom 


    /*
        pass html content 
    **/
    constructor(content){
        this.dom = new jsdom.JSDOM(content)
    }

    /*

   **/
    save() {
        let collection = this.dom.window.document.body
        // console.log(this.dom.window.document)
        let div, source, name
    
        
        /*
            Its working dont touch it
        */
        for (let i = 0; i < collection.getElementsByTagName('div').length; ++i) {
            
            div = collection.getElementsByTagName('div')[i].getElementsByTagName('img')
           

            if (this._containImage(div) != 0) {

                source = div[0].src // its image url or DataURI
                
                
                name = `${uniqID()}.${this._getExtension(source)}`
   
               
                // collection.getElementsByTagName('div')[i].innerHTML = `<img src="${name}" >`
                collection.getElementsByTagName('div')[i].getElementsByTagName('img')[0].src = name
                
                // console.log(collection.getElementsByTagName('div')[i].innerHTML)
      

                
                if(this._isDataUri(source)){

                }
                else{

                }   
            }

        }
        // console.log(collection.innerHTML)
        // this.dom.window.document.body.innerHTML = collection.innerHTML
        console.log(collection.innerHTML)
        // this._saveEntryContent(this.dom.window.document.body.innerHTML)
        
    }
    /*
        It works because objects are passes by reference.
    **/
    _injectNewNameToImageSource(name, image){
        
        
    }
    _isDataUri(image){
        if (image.substr(0, 5) == "data:")
            return true
        return false
    }


    _saveUriImage(uri, name){
        let buffer = Buffer.from(uri.split(',')[1], 'base64')
        this._saveImage(buffer)
    }

    _downloadAndSaveImage(url, name){
        let buffer = this._downloadImage(url)
        this._saveImage(buffer)
    }
    /* 

    save Image to the path that is previously created

    **/

    async _saveImage(buffer) {
        try {
            let destinationPath = `${path}/${uniqID()}.${this._getExtension(image)}`
            fs.writeFile(destinationPath, buffer, (e) => {
                if (e)
                    console.error(e)
            })
        } catch (e) { console.error(e) }
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















