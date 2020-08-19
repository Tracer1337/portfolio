const loadProjects = require("../../scripts/load-projects.js")
const { exec } = require("@m.moelter/task-runner")

async function runLoadProjects(req, res) {
    // Pull new contents from github
    await exec("sudo git pull")

    // Load new contents into website
    await loadProjects()

    res.end()
}

module.exports = { loadProjects: runLoadProjects }