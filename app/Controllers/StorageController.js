const Storage = require("../Facades/StorageFacade.js")

async function getFile(req, res) {
    try {
        res.end(Storage.getFile(req.params.file))
    } catch {
        res.status(404).end()
    }
}

module.exports = { getFile }
