const fs = require("fs")
const path = require("path")
const AWS = require("aws-sdk")
const { v4: uuid } = require("uuid")

const s3 = new AWS.S3({ apiVersion: "2006-03-01" })

const ROOT_DIR = path.join(__dirname, "..", "..")
const DEV_BUCKET_DIR = path.join(ROOT_DIR, process.env.AWS_BUCKET)

const cache = new Map()

const useLocalStorage = true

const StorageFacade = {
    createBucket(bucketName = process.env.APP_NAME + "-" + uuid()) {
        return new Promise((resolve, reject) => {
            if (useLocalStorage) {
                fs.mkdirSync(path.join(ROOT_DIR, bucketName))
                return resolve({ Bucket: bucketName })
            }

            s3.createBucket({ Bucket: bucketName }, (error, data) => {
                if (error) {
                    return reject(error)
                }

                resolve({ ...data, Bucket: bucketName })
            })
        })
    },

    uploadFile(inputPath, outputPath, bucketName = process.env.AWS_BUCKET) {
        const fileName = path.basename(outputPath)

        cache.set(fileName, fs.readFileSync(inputPath))

        if (useLocalStorage) {
            return fs.copyFileSync(inputPath, path.join(ROOT_DIR, bucketName, fileName))
        }

        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(inputPath)

            fileStream.on("error", error => reject(error))

            const params = {
                Bucket: bucketName,
                Key: outputPath,
                Body: fileStream
            }

            s3.upload(params, (error, data) => {
                if (error) {
                    return reject(error)
                }

                resolve(data)
            })
        })
    },

    getFile(filePath, bucketName = process.env.AWS_BUCKET) {
        const fileName = path.basename(filePath)

        if (cache.has(fileName)) {
            return cache.get(fileName)
        }

        return new Promise((resolve, reject) => {
            let stream

            if (useLocalStorage) {
                stream = fs.createReadStream(path.join(DEV_BUCKET_DIR, fileName))
            } else {
                const params = {
                    Bucket: bucketName,
                    Key: filePath
                }

                stream = s3.getObject(params).createReadStream()
            }

            const buffers = []

            stream.on("error", reject)

            stream.on("data", (chunk) => buffers.push(chunk))

            stream.on("end", () => {
                const buffer = Buffer.concat(buffers)
                cache.set(fileName, buffer)
                resolve(buffer)
            })
        })
    },

    deleteFile(filePath, bucketName = process.env.AWS_BUCKET) {
        const fileName = path.basename(filePath)

        cache.delete(fileName)

        return new Promise(resolve => {
            if (useLocalStorage) {
                fs.unlinkSync(path.join(DEV_BUCKET_DIR, fileName))
                resolve(true)
            } else {
                const params = {
                    Bucket: bucketName,
                    key: filePath
                }

                s3.deleteObject(params, (error, data) => {
                    if (error) {
                        return resolve(false)
                    }

                    resolve(true)
                })
            }
        })
    }
}

module.exports = StorageFacade