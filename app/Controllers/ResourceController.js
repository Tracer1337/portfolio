const ContentLoader = require("../Services/ContentLoader")

function getTotalTechstack(req, res) {
    res.send(ContentLoader.techstack)
}

function getProjects(req, res) {
    const projects = Object.values(ContentLoader.projects)
    res.send(projects)
}

function getImage(req, res) {
    const image = ContentLoader.images[req.params.file]
    if (!image) {
        return res.sendStatus(404)
    }
    res.set("Content-Type", "image/webp").send(image)
}

module.exports = {
    getTotalTechstack,
    getProjects,
    getImage
}
