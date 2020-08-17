const TechstackEntry = require("../Models/TechstackEntry.js")
const Project = require("../Models/Project.js")

async function getTotalTechstack(req, res) {
    // Get distinct techstack entries
    const entries = await TechstackEntry.findDistinct("name")

    res.send(entries)
}

async function getProjects(req, res) {
    // Get project models
    const projects = await Project.where("id = id")

    res.send(projects)
}

module.exports = { getTotalTechstack, getProjects }