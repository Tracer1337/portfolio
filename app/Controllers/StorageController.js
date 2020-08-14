const Storage = require("../Facades/StorageFacade.js")
const { compressImage, readFileAsync, unlinkAsync, createTempFile } = require("../utils")
const config = require("../../config")

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

async function storeFile(req, res) {
    if (!req.file || !req.body.name) {
        return res.status(400).end()
    }

    try {
        // Read file to buffer
        let buffer = await readFileAsync(req.file.path)

        // Compress image
        buffer = await compressImage(buffer)

        // Create new temp file from buffer
        const temp = await createTempFile(buffer, config.imageFormat)

        // Upload file to storage
        const filename = temp.filename.replace(/^[^.]+/, req.body.name)
        await Storage.uploadFile(temp.path, filename)

        // Delete temp files
        await unlinkAsync(req.file.path)
        await temp.delete()

        res.send(filename)
    } catch(error) {
        console.log(error)
        res.status(500).end()
    }
}

async function deleteFile(req, res) {
    if (!req.params.file) {
        return res.status(400).end()
    }

    try {
        // Delete file from storage
        await Storage.deleteFile(req.params.file)

        res.end()
    } catch(error) {
        res.status(404).end()
    }
}

module.exports = { getFile, storeFile, deleteFile }