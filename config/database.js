const {MongoClient} = require('mongodb')

async function connection(){
    const uri = process.env.DB_URL
    const client = new MongoClient(uri)

    try{
        await client.connect()
        console.log("connected to db")
    }
    catch(e){
        console.error(e)
    }
    // finally{
    //     await client.close()
    // }
}


module.exports.connection = connection