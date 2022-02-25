const fs = require('fs')
const fetch = require('cross-fetch')
let uniqID = require('uniqid')
const pathOS = require('path')
const jsdom = require('jsdom')
const Entry = require('../model/Entry')
const User= require('../model/User')
const Thread = require('../model/Thread')


module.exports.EntryWriter = class EntryWriter{
    path;
    dom;
    user;
    req_data;
    directoryId; // directoryId of directory

    /*
        pass html content 
    **/
    constructor(data, user){
        this.directoryId = uniqID()
        this.req_data = data
        this.dom = new jsdom.JSDOM(data.content)
        this.path= this._createDirectoryPath();  

        // let id = mongoose.Types.ObjectId(user._id);
        // console.log(id.valueOf())
    }

    /*
        save() is main function of EntryHandler.
        It's saves images and entry to folder
        and all 

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
        // and saves necessary data into database
        this._saveEntryContent(collection.innerHTML)


     

    }

    /*

    */
    async _saveIntoDataBase(contentID){
        try{
            let thread =  await Thread.findOne({title:this.req_data.title})
            
            const entry = new Entry({
                title: this.req_data.title,
                thread: thread,
                content_path: pathOS.normalize(this.path),
                file_name: `${contentID}.html`
            })
            await entry.save()
            console.log("saved into db")

        }
        catch(e){
            console.error(e)
        }
     
    }
    /*
        It works because objects are passes by reference.
    **/
    _injectNewNameToImageSource(name, image){
        image.getElementsByTagName('img')[0].src = "http://localhost:5000/image/"+this.directoryId+'/'+name
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
        let contentID = uniqID()
        let destinationPath = `${this.path}/${contentID}.html`
        
        fs.writeFile(destinationPath, content, (e)=>{
            if(e) 
                console.error(e)
            else
                this._saveIntoDataBase(contentID)
        })
    }

    /* 
    
        create Directory path for entry content and images

    **/

    _createDirectoryPath() {
        let path = `${__dirname}/../Data/Entries/` + this.directoryId
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



module.exports.EntryReader = class EntryReader{
    entry

  
   
    async getEntryData(date, index, thread){   
        this.entry = await this._findEntryBy(date, index, thread)
        console.log(`entry: ${this.entry}`)
        if(this.entry === null)
            return{
                succes: false,
                info: "Nie ma więcej postów"
            }

        let title = this._getTitle()
        let user_data = await this._getUserData()
        let thread_entry = this._getThread()
        let date_entry = this._getDate()
        let file_path = this._getFilePath()
        let content = await this._getContent(file_path)

        return {
            succes: true,
            title: title,
            user_name: user_data.name,
            user_profil: user_data.profileImage,
            thread: thread_entry,
            date: date_entry,
            content: content
        }
        
    

    }
    // TODO check why it doenst return other entries when index increase
    
    async _findEntryBy(date, index, thread) {
        if (thread == 'none')
            return Entry.findOne({ 
                date: { $lt: new Date(date) } })
                .skip(index)
                .then(result => {
                    console.log(`result without thread: ${result}`)
                    return result;
                })

        else{
            let threadId = await this._getThreadId(this._getThread)
            console.log(`threadId ${threadId}`)
            return Entry.findOne({
                date: { $lt: new Date(date) },
                thread: threadId
                })
                .skip(index)
                .then(result => {
                    console.log(`result with thread: ${result}`)
                    return result
                })
        }
    }
    _getThreadId(thread){
        return new Promise((resolve, reject)=>{
            Thread.findOne({title : thread})
            .then(result=>{
                resolve(result)
            })
            .catch(e=>{
                reject(e)
            })
        })
    }

    _getContent(file_path){
        return new Promise((resolve, reject)=>{
            fs.readFile(file_path, (err, content) => {
                if (err) {
                    reject(`error cannot read content of file ${file_path}`)
                }
                resolve(content.toString())
            })
        })
    }

    _getFilePath(){
        let file_path = `${this.entry.content_path}/${this.entry.file_name}`
        return pathOS.resolve(file_path) 

    }

    _getUserData(){
        return User.findOne({userId: this.entry.userId})
    }

    _getTitle(){
        return this.entry.title
    }
    
    _getDate(){
        return this.entry.date
    }

    _getThread(){
        return this.entry.thread
    }
    

 



}







