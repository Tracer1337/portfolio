const loadProjects = require("../../scripts/load-projects.js")

async function runLoadProjects(req, res) {
    await loadProjects()

    res.end()
}

module.exports = { loadProjects: runLoadProjects }