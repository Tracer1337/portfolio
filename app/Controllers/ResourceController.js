const path = require("path")

const TechstackEntry = require("../Models/TechstackEntry.js")
const Project = require("../Models/Project.js")
const { readFileAsync } = require("../utils")

const CONTENT_DIR = path.join(__dirname, "..", "..", "content")

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

async function getAboutMe(req, res) {
    // Get content of "aboutme.md"
    const content = (await readFileAsync(path.join(CONTENT_DIR, "ABOUTME.md"))).toString()

    res.send(content)
}

module.exports = { getTotalTechstack, getProjects, getAboutMe }