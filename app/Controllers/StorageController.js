const { v4: uuid } = require("uuid")

const Storage = require("../Facades/StorageFacade.js")
const { compressImage, readFileAsync, unlinkAsync, createTempFile } = require("../utils")
const config = require("../../config")
const Asset = require("../Models/Asset.js")
const TechstackEntry = require("../Models/TechstackEntry.js")

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
        // Check if techstack entry exists for given name
        const techstackEntry = await TechstackEntry.findBy("name", req.body.name)

        if (!techstackEntry) {
            return res.status(404).end()
        }

        // Delete existing asset if exists
        let asset = await Asset.findBy("filename", `${req.body.name}.${config.imageFormat}`)

        if (asset) {
            await asset.delete()
        }
        
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

        // Create asset and store it to the database
        asset = new Asset({
            id: uuid(),
            model_ref: techstackEntry.id,
            type: "techstack_entry_icon",
            filename,
            path: `/storage/${filename}`
        })

        await asset.store()

        res.send(asset)
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
        // Get asset from database
        const asset = await Asset.findBy("filename", req.params.file)

        // Delete asset
        await asset.delete()

        res.end()
    } catch(error) {
        res.status(404).end()
    }
}

module.exports = { getFile, storeFile, deleteFile }