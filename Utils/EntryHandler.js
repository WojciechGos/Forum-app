const fs = require('fs')
const fetch = require('cross-fetch')
let uniqID = require('uniqid')
const pathOS = require('path')
const jsdom = require('jsdom')
const Entry = require('../model/Entry')
const User= require('../model/User')
const Thread = require('../model/Thread')
const Comment = require('../model/Comment')
const mongoose = require('mongoose')


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
        
        this.req_data = data
        this.dom = new jsdom.JSDOM(data.content)
        this.user = user
    }
    /*
        It's saves images and entry to folder
   **/
    async saveEntry(){
        this.directoryId = uniqID()
        this.path = this._createDirectoryPath(); 
        let content = this._processContent()
        await this._saveEntryIntoDataBase(content)
    }
    async saveComment(folder){
        try{
            this.directoryId = folder
            this.path = this._getDirectoryPath()
            let content = this._processContent()
            let id = await this._saveCommentIntoDataBase(content)
            this._updateArrayOfComments(id, folder)
            return {succes : true, info: "Udało się dodać komentarz"}
        }
        catch(e){
            console.error(e)
            return {succes: false, info: "Nie można dodac komentarza"}
        }

    }

    async _updateArrayOfComments(id, folder){
        Entry.updateOne(
            {directoryId: folder},
            {$push: {comment: [id]}},
            function(err, result){
                if(err)
                    console.error(err)
                else
                    console.log("updated entry comment")
            }
        )
    
    }

    _processContent() {
       
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
        return collection.innerHTML
    }
    async _findEntryByFolderName(folder){

    }

    async _saveEntryIntoDataBase(content){
        try{
            const entry = new Entry({
                userId: this.user._id,
                title: this.req_data.title,
                thread: this.req_data.thread,
                directoryId: this.directoryId,
                content: content
            })
            await entry.save()
            console.log("saved entry into db")
        }
        catch(e){
            console.error(e)
        }
     
    }

    async _saveCommentIntoDataBase(content){
        let id = await  mongoose.Types.ObjectId();
        try{
            const comment = new Comment({
                _id: id,
                userId: this.user._id,
                diretcoryId: this.directoryId,
                content: content
            })
            await comment.save()
            console.log('saved comment into db')
            return id
        }
        catch(e){
            console.error(e)
        }
    }
    /*
        It works because objects are passes by reference.
    **/
    _injectNewNameToImageSource(name, image){
        image.getElementsByTagName('img')[0].src = `${process.env.DOMAIN}/image/${this.directoryId}/${name}`
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
         
        let destinationPath = pathOS.resolve(`${this.path}/${name}`)
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
        } 
        catch (e) {
            console.error(e)
        }
    }

    /* 
    
        create Directory path for entry content and images

    **/
    _getDirectoryPath(){
        return pathOS.resolve(`${__dirname}/../Data/Entries/${this.directoryId}`)
    }

    _createDirectoryPath() {
        let path = pathOS.resolve(`${__dirname}/../Data/Entries/${this.directoryId}`)
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

        // todo: check if have webp extension
        if (item.slice(0, 5) == "data:") {
            return item.split(';')[0].split('/')[1]
        }
        return item.split('.').pop()
    }
}



module.exports.EntryReader = class EntryReader{
    entry

    async getEntry(date, index, thread){   
        this.entry = await this._findEntryBy(date, index, thread)
        
        if(this.entry[0] === null || this.entry[0] === undefined)
            return{
                succes: false,
                info: "Nie ma więcej postów"
            }

        let title = this._getTitle()
        let user_data = await this._getUserData()
        let thread_entry = this._getThread()
        let date_entry = this._getDate()
        let content = this._getContent()
        let commentLocalisation = this._getCommentLocalisation()

        if (title && user_data && thread_entry && date_entry  && content)
            return {
                succes: true,
                title: title,
                user_name: user_data.name,
                user_profil: user_data.profileImage,
                thread: thread_entry,
                date: date_entry,
                content: content,
                commentLocalisation: commentLocalisation
            }
        else
            return {
                succes: false,
                info: "nie można pobrać postu"
            }
        
    

    }
    async _findEntryBy(date, index, thread) {

        if (thread == 'none')
            return Entry.find({ 
                date: { $lt: new Date(date) } })
                .skip(index)
                .sort({$natural:-1})
                .limit(1)
                .then(result => {
                    return result;
                })
                .catch(e => {
                    return null
                })
        else{
            let threadId = await this._getThreadId(this._getThread)
            return Entry.findOne({
                date: { $lt: new Date(date) },
                thread: threadId
                })
                .skip(index)
                .limit(1)
                .then(result => {
                    return result
                })
                .catch(e =>{
                    return null
                })
        }
    }

    _getCommentLocalisation(){
        return this.entry[0].directoryId
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

    _getContent(){
        return this.entry[0].content
    }


    async _getUserData(){
        try{
            return await User.findById(this.entry[0].userId)
        }
        catch(e){
            console.error(e)
        }
    }

    _getTitle(){
        return this.entry[0].title
    }
    
    _getDate(){
        return this.entry[0].date
    }

    _getThread(){
        return this.entry[0].thread
    }
    
}