const fs = require("fs")
const path = require("path")

const ROOT_DIR = path.join(__dirname, "..", "..")
const STORAGE_DIR = path.join(ROOT_DIR, "storage")

const StorageFacade = {
    createFolder() {
        if (!fs.existsSync(STORAGE_DIR)) {
            fs.mkdirSync(STORAGE_DIR)
        }
    },
    
    uploadFile(inputPath, outputPath) {
        this.createFolder()
        const fileName = path.basename(outputPath)
        return fs.copyFileSync(inputPath, path.join(STORAGE_DIR, fileName))
    },

    getFile(filePath) {
        const fileName = path.basename(filePath)
        return fs.readFileSync(path.join(STORAGE_DIR, fileName))
    },

    deleteFile(filePath) {
        const fileName = path.basename(filePath)
        fs.unlinkSync(path.join(STORAGE_DIR, fileName))
    }
}

module.exports = StorageFacade
