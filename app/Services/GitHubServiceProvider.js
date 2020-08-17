const { Octokit } = require("@octokit/rest")
const { v4: uuid } = require("uuid")

const config = require("../../config")
const Project = require("../Models/Project.js")
const Asset = require("../Models/Asset.js")
const Storage = require("../Facades/StorageFacade.js")
const Collection = require("../../lib/Collection.js")
const { createTempFile, compressImage } = require("../utils")
const APIServiceProvider = require("./APIServiceProvider.js")
const { removeAllProjects } = require("../Services/ProjectServiceProvider.js")

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
        model_id: project.id,
        type,
        filename: tempFile.filename,
        path: publicUrl
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
    try {
        const { data: readme } = await octokit.repos.getReadme({
            owner: repo.owner.login,
            repo: repo.name,
            mediaType: {
                format: "html"
            }
        })
        
        return readme
    } catch { }
}

/**
 * Fetch API Data from apis defined in project.json { apis: ... }
 */
async function fetchAPIData(project) {
    const result = {}
    
    if (!project.apis) {
        return result
    }

    await Promise.all(Object.entries(project.apis).map(async ([api, data]) => {
        if (!APIServiceProvider.apis[api]) {
            return
        }
        
        try {
            const response = await APIServiceProvider.apis[api](data)

            result[api] = {
                ...data,
                data: response
            }
        } catch(error) {
            console.error(error)
        }
    }))

    return result
}

/**
 * Convert git repository to project model
 */
async function createProjectFromRepo(repo) {
    // Fetch .project folder
    const contentsUrl = repo.contents_url.replace("{+path}", config.github.projectFolder)
    const { data: contents } = await octokit.request(contentsUrl)
    
    // Fetch project.json data
    const projectFileMeta = contents.find(file => file.name === config.github.projectFilename)
    const { data } = await octokit.request(projectFileMeta.download_url)
    const projectFileContents = JSON.parse(data)
    
    // Fetch readme
    const readme = await getReadmeFromRepo(repo)
    
    // Fetch API Data
    const apiData = await fetchAPIData(projectFileContents)
    
    // Create project model
    const project = new Project({
        id: uuid(),
        name: projectFileContents.name,
        website: projectFileContents.website,
        description: projectFileContents.description,
        type: projectFileContents.type,
        apis: apiData,
        readme
    })
    
    // Create assets from images
    const assets = await getAssetsFromContents(contents, project)
    
    // Set project's dependencies
    project.setTechstack(projectFileContents.techstack || [])
    project.setAssets(assets || [])
    
    return project
}

/**
 * Create projects from git repositories with .project folder
 */
async function fetchProjects() {
    // Get user's repositories
    const { data: repos } = await octokit.repos.listForAuthenticatedUser()

    // Get projects from repositories
    const projects = new Collection()

    await Promise.all(repos.map(async (repo) => {
        try {
            const project = await createProjectFromRepo(repo)
            projects.push(project)
        } catch {
            return
        }
    }))

    return projects
}

/**
 * Delete all projects and re-fetch them from github
 */
async function loadProjects() {
    console.log("Load projects")

    // Remove all projects
    await removeAllProjects()

    // Get all projects from user's GitHub account
    const projects = await fetchProjects()

    // Store projects to database
    await projects.mapAsync(async project => await project.store())

    console.log("Load Projects Done")
}

module.exports = { loadProjects }