const User = require('../model/User')
const fs = require('fs')
const { rejects } = require('assert')




function getMainUserData(user){    
    return new Promise((resolve, reject)=>{
        if(user != null) {
            const imagePath = `${__dirname}\\..\\Images\\Profiles\\${user.name}-avatar.svg`
            fs.readFile(imagePath, 'utf-8', (err, img)=>{
                if(err){
                    reject(err)
                }
                resolve({mainUser: user, image: img})
                return
            })
        }else{
            resolve({user: null})
        }
    })
}

async function getUserData(name){
    let user
    try {
        user = await User.findOne({name:name})
    } catch (error) {
        return e
    }
    if(user == null)
        return null
    
    const imagePath = `${__dirname}\\..\\Images\\Profiles\\${user.name}-avatar.svg`
    return new Promise(async (resolve, reject)=>{
            let img = await fs.readFile(imagePath, (err, img)=>{
                if(err){
                    reject(err)
                }else{
                    resolve({user: user,image: img})
                }
            })
    
    })
}



module.exports.getMainUserData = getMainUserData
module.exports.getUserData = getUserData

