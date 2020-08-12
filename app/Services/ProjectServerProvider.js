const Project = require("../Models/Project.js")

async function removeAllProjects() {
    const projects = await Project.where("id = id")

    await projects.mapAsync(async project => {
        await project.init()
        await project.delete()
    })
}

module.exports = { removeAllProjects }