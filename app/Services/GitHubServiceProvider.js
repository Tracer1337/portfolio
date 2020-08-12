const { Octokit } = require("@octokit/rest")
const { v4: uuid } = require("uuid")

const config = require("../../config")
const Project = require("../Models/Project.js")
const Asset = require("../Models/Asset.js")
const Storage = require("../Facades/StorageFacade.js")
const Collection = require("../../lib/Collection.js")
const { createTempFile, compressImage } = require("../utils")

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: "portfolio"
})

/**
 * Create an asset model and store the contents from buffer to filesystem
 */
async function createAssetFromBuffer(buffer, { project, type }) {
    // Compress image from buffer
    buffer = await compressImage(buffer)

    // Create temp file
    const tempFile = await createTempFile(buffer, config.imageFormat)

    // Upload file to storage
    Storage.uploadFile(tempFile.path, tempFile.filename)

    await tempFile.delete()

    const publicUrl = `${config.routes.storage}/${tempFile.filename}`

    // Create asset
    const asset = new Asset({
        id: uuid(),
        project_id: project.id,
        type,
        filename: tempFile.filename,
        url: publicUrl
    })

    return asset
}

/**
 * Fetch assets from git repository and store on the filesystem / database
 */
async function getAssetsFromContents(contents, project) {
    const assets = new Collection()

    // Create asset from thumbnail
    const hasThumbnail = contents.some(file => file.name.startsWith(config.github.thumbnailFilename))

    if (hasThumbnail) {
        const meta = contents.find(file => file.name.startsWith(config.github.thumbnailFilename))
        const { data: array } = await octokit.request(meta.download_url)
    
        const asset = await createAssetFromBuffer(Buffer.from(array), {
            meta, project,
            type: config.assetTypes.thumbnail
        })
    
        assets.push(asset)
    }

    // Create assets from gallery images
    const hasGallery = contents.some(file => file.name === config.github.galleryFoldername)

    if (hasGallery) {
        const meta = contents.find(file => file.name === config.github.galleryFoldername)
        const { data: files } = await octokit.request(meta.url)

        await Promise.all(files.map(async (file) => {
            const { data: array } = await octokit.request(file.download_url)

            const asset = await createAssetFromBuffer(Buffer.from(array), {
                meta: file, project,
                type: config.assetTypes.gallery
            })

            assets.push(asset)
        }))
    }

    return assets
}

/**
 * Fetch readme from git repository
 */
async function getReadmeFromRepo(repo) {
    const { data: readme } = await octokit.repos.getReadme({
        owner: repo.owner.login,
        repo: repo.name,
        mediaType: {
            format: "html"
        }
    })
    
    return readme
}

/**
 * Convert git repository to project model
 */
async function getProjectFromRepo(repo) {
    // Fetch .project folder
    const contentsUrl = repo.contents_url.replace("{+path}", config.github.projectFolder)
    const { data: contents } = await octokit.request(contentsUrl)
    
    // Fetch project.json data
    const projectFileMeta = contents.find(file => file.name === config.github.projectFilename)
    const { data } = await octokit.request(projectFileMeta.download_url)
    const projectFileContents = JSON.parse(data)

    // Fetch readme
    const readme = await getReadmeFromRepo(repo)
    
    // Create project model
    const project = new Project({
        id: uuid(),
        name: projectFileContents.name,
        website: projectFileContents.website,
        description: projectFileContents.description,
        readme
    })

    // Create assets from images
    const assets = await getAssetsFromContents(contents, project)
    
    // Set project's dependencies
    project.setTechstack(projectFileContents.techstack)
    project.setAssets(assets)
    
    return project
}

/**
 * Filter projects out of all git repositories
 */
async function fetchProjects() {
    // Get user's repositories
    const { data: repos } = await octokit.repos.listForAuthenticatedUser()

    // Get projects from repositories
    const projects = new Collection()

    await Promise.all(repos.map(async (repo) => {
        try {
            const project = await getProjectFromRepo(repo)
            projects.push(project)
        } catch {
            return
        }
    }))

    return projects
}

module.exports = { fetchProjects }