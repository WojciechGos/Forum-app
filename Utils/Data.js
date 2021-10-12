const User = require('../model/User')
const fs = require('fs')




function getMainUserData(user){    
    return new Promise((resolve, reject)=>{
        if(user != null) {
                const imagePath = `${__dirname}/../Images/Profiles/${user.name}-avatar.svg`
                fs.readFile(imagePath, 'utf-8', (err, img)=>{
                if(err){
                    reject(err)
                }
                Object.assign(user, {image: img})
                resolve({mainUser: user})
                
            })
        }else{
            resolve({user: null})
        }
    })
}

async function getUserData(name){
    console.log(`name: ${name}`)
    try{
        let user = await User.findOne({ name: name })

        const imagePath = `${__dirname}/../Images/Profiles/${name}-avatar.svg`
        return new Promise((resolve, reject) => {
            fs.readFile(imagePath, 'utf-8', (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    Object.assign(user, {image: data})
                    resolve({user: user})
                }
            })

        })
    }catch(e){
        console.error(e)
    }
}



module.exports.getMainUserData = getMainUserData
module.exports.getUserData = getUserData

