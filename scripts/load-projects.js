const { v4: uuid } = require("uuid")
const fs = require("fs")
const path = require("path")
const { makeRunnable, run } = require("@m.moelter/task-runner")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const config = require("../config")
const Storage = require("../app/Facades/StorageFacade")
const Project = require("../app/Models/Project.js")
const Asset = require("../app/Models/Asset.js")
const TechstackEntry = require("../app/Models/TechstackEntry.js")
const { fetchMultipleAPIData } = require("../app/Services/APIServiceProvider.js")
const { createConnectionAsync } = require("../database/index.js")
const { compressImage, readdirAsync, readFileAsync, createTempFile } = require("../app/utils")

const ROOT_DIR = path.join(__dirname, "..")
const PROJECTS_DIR = path.join(ROOT_DIR, "content", "projects")

// Create asset from file and store to disk / database
async function storeImageForModel(filename, type) {
    // Get image buffer
    const image = await readFileAsync(path.join(this.rootFolder, filename))

    // Compress image
    const compressed = await compressImage(image)

    // Write file to storage
    const temp = await createTempFile(compressed, config.imageFormat)
    await Storage.uploadFile(temp.path, temp.filename)
    await temp.delete()

    // Create asset
    const asset = new Asset({
        id: uuid(),
        model_ref: this.model_ref,
        type,
        filename: temp.filename,
        path: `${config.routes.storage}/${temp.filename}`
    })

    // Store asset to database
    await asset.store()
}

makeRunnable(async () => {
    global.db = await createConnectionAsync()

    // Delete all models
    await run(async () => {
        const projects = await Project.where("id = id")
        const techstackEntries = await TechstackEntry.where("id = id")
        const assets = await Asset.where("id = id")

        await Promise.all([...projects, ...techstackEntries, ...assets].map(async model => {
            if (model.init) {
                await model.init()
            }
            await model.delete()
        }))
    }, "Deleting models")

    // Store new projects
    await run(async () => {
        // Load projects.json
        const projects = require(path.join(PROJECTS_DIR, "projects.json"))

        // Create new projects
        await Promise.all(projects.map(async data => {
            // Fetch data from given endpoints
            const apiData = await fetchMultipleAPIData(data.apis)
            
            const project = new Project({
                ...data,
                id: uuid(),
                apis: apiData
            })

            // Handle project's assets
            if (data["assets-folder"]) {
                const assetsFolder = path.join(PROJECTS_DIR, data["assets-folder"])

                const storeImage = storeImageForModel.bind({
                    model_ref: project.id,
                    rootFolder: assetsFolder
                })
                
                const files = await readdirAsync(assetsFolder)

                // Create asset from thumbnail
                const thumbnail = files.find(filename => filename.startsWith("thumbnail"))

                if (thumbnail) {
                    await storeImage(thumbnail, config.assetTypes.thumbnail)
                }

                // Create assets for gallery
                const gallery = files.find(filename => filename === "gallery")

                if (gallery) {
                    const images = await readdirAsync(path.join(assetsFolder, "gallery"))

                    await Promise.all(images.map(async filename => {
                        await storeImage(path.join("gallery", filename), config.assetTypes.gallery)
                    }))
                }

                // Get contents of readme file
                const hasReadme = files.some(filename => filename === "README.md")

                if (hasReadme) {
                    project.readme = (await readFileAsync(path.join(assetsFolder, "README.md"))).toString()
                }
            }

            // Set project's dependencies
            if (data.techstack) {
                await project.setTechstack(data.techstack)
            }

            // Store project into database
            await project.store()
        }))

        // Handle techstack entries' assets
        await (async () => {
            const techstackFolder = path.join(ROOT_DIR, "content", "techstack")

            const files = await readdirAsync(techstackFolder)

            // Create and store assets for all techstack-icons
            await Promise.all(files.map(async filename => {
                const storeImage = storeImageForModel.bind({
                    model_ref: filename.match(/^[^.]+/)[0],
                    rootFolder: techstackFolder
                })

                await storeImage(filename, config.assetTypes.techstackIcon)
            }))
        })()
    }, "Creating models")

    db.end()
})()