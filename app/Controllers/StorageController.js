const Storage = require("../Facades/StorageFacade.js")

async function getFile(req, res) {
    const buffer = Storage.getFile(req.params.file)

    if (Buffer.isBuffer(buffer)) {
        res.header("X-From-Cache", true).end(buffer)
    } else {
        try {
            res.end(await buffer)
        } catch {
            res.status(404).end()
        }
    }
}

module.exports = { getFile }