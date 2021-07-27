const fs = require("fs")
const path = require("path")
const { v4: uuid } = require("uuid")
const { compressImage } = require("../utils")
const config = require("../../config")

const CONTENT_PATH = path.join(__dirname, "..", "..", "content")
const PROJECTS_PATH = path.join(CONTENT_PATH, "projects")

const techstackIcons = require(path.join(CONTENT_PATH, "techstack-icons.json"))
const projectFile = require(path.join(PROJECTS_PATH, "projects.json"))

class ContentLoader {
    static images = {}
    static projects = {}
    static techstack = []

    static async loadContent() {
        await this.loadProjects()
        await this.loadImages()
    }

    static async loadProjects() {
        for (let i = 0; i < projectFile.length; i++) {
            const project = projectFile[i]
            this.projects[project.slug] = {
                name: project.name,
                slug: project.slug,
                website: project.website,
                description: project.description,
                type: project.type,
                position: i,
                techstack: this.getIconsFromTechstack(project.techstack),
                readme: await this.loadReadme(project.slug),
                thumbnail: null,
                gallery: []
            }
            this.updateTechstack(this.projects[project.slug])
        }
    }

    static loadReadme(projectName) {
        const filepath = path.join(
            PROJECTS_PATH,
            projectName,
            config.filenames.readme
        )
        return fs.promises.readFile(filepath, "utf-8")
    }

    static async loadImages() {
        for (let project of Object.values(this.projects)) {
            project.thumbnail = await this.loadThumbnail(project.slug)
            project.gallery = await this.loadGallery(project.slug)
        }
    }

    static async loadThumbnail(projectName) {
        const thumbnail = path.join(
            PROJECTS_PATH,
            projectName,
            config.filenames.thumbnail
        )
        const compressed = await this.compressImage(thumbnail)
        const filename = this.generateImageFilename()
        this.images[filename] = compressed
        return filename
    }

    static async loadGallery(projectName) {
        const folderPath = path.join(
            PROJECTS_PATH,
            projectName,
            config.filenames.gallery
        )
        const images = await fs.promises.readdir(folderPath)
        const result = []
        for (let imageName of images) {
            const imagePath = path.join(folderPath, imageName)
            const compressed = await this.compressImage(imagePath)
            const filename = this.generateImageFilename()
            this.images[filename] = compressed
            result.push(filename)
        }
        return result
    }

    static getIconsFromTechstack(techstack) {
        return techstack.map((name) => {
            const item = { name }
            if (name in techstackIcons) {
                item.icon = techstackIcons[name]
            }
            return item
        })
    }

    static updateTechstack(project) {
        project.techstack.forEach((item) => {
            if (!this.hasTechstackItem(item)) {
                this.techstack.push(item)
            }
        })
    }

    static hasTechstackItem(item) {
        return this.techstack.some((_item) => _item.name === item.name)
    }

    static async compressImage(imagePath) {
        const raw = await fs.promises.readFile(imagePath)
        return await compressImage(raw)
    }

    static generateImageFilename() {
        return `${uuid()}.${config.imageFormat}`
    }
}

module.exports = ContentLoader
