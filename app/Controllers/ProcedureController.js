const { fetchProjects } = require("../Services/GitHubServiceProvider.js")
const { removeAllProjects } = require("../Services/ProjectServerProvider.js")

async function loadProjects(req, res) {
    // Remove all projects
    await removeAllProjects()
    
    // Get all projects from user's GitHub account
    const projects = await fetchProjects()

    // Store projects to database
    await projects.mapAsync(async project => await project.store())

    if (res) {
        res.send(projects)
    }
}

module.exports = { loadProjects }