const fs = require("fs")
const path = require("path")
const { v4: uuid } = require("uuid")
const util = require("util")
const sharp = require("sharp")

const config = require("../../config")

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)
const unlinkAsync = util.promisify(fs.unlink)
const readdirAsync = util.promisify(fs.readdir)
const existsAsync = util.promisify(fs.exists)

const ROOT_DIR = path.join(__dirname, "..", "..")
const TEMP_DIR = path.join(ROOT_DIR, config.tempDir)

// Run db.query promise-based
function queryAsync(query) {
    // Replace "null" and "undefined" with NULL
    query = query.replace(/['"](null|undefined)['"]/g, "NULL")
    
    return new Promise((resolve, reject) => {
        db.query(query, (error, result) => {
            if (error) {
                console.error(error)
                reject()
            }

            resolve(result)
        })
    })
}

// Convert array to list to be used in a SQL query
// Example: [1, 2, 3] => "('1', '2', '3')"
function quotedList(array) {
    return `(${array.map(element => `'${element}'`).join(",")})`
}

// Create file in /temp folder
async function createTempFile(buffer, extension) {
    const filename = `${uuid()}.${extension}`
    const filepath = path.join(TEMP_DIR, filename)

    await writeFileAsync(filepath, buffer)

    return {
        filename,
        path: filepath,
        delete: async () => await unlinkAsync(filepath)
    }
}

// Extract file extension from filename
function getFileExtension(filename) {
    const match = filename.match(/[^.]+$/)
    return match ? match[0] : null
}

// Resize image to given width
async function compressImage(buffer) {
    const image = sharp(buffer)
    const metadata = await image.metadata()

    return await image
            .resize(metadata.width < config.maxImageWidth ? metadata.width : config.maxImageWidth)
            .toFormat(config.imageFormat)
            .toBuffer()
}

module.exports = {
    queryAsync,
    quotedList,
    createTempFile,
    getFileExtension,
    compressImage,
    readFileAsync, writeFileAsync, unlinkAsync, readdirAsync, existsAsync
}
