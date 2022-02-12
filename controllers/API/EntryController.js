

const EntryReader = require('../../Utils/EntryHandler').EntryReader

function entryGet(req, res){

    const date = req.params.date
    const index = req.params.index
    const thread = req.params.thread

    const entry = new EntryReader(date, index, thread)

    // entry.resond()

}

module.exports.entryGet = entryGet