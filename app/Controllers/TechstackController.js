const TechstackEntry = require("../Models/TechstackEntry.js")

async function getTotalTechstack(req, res) {
    // Get distinct techstack entries
    const entries = await TechstackEntry.findDistinct("name")

    res.send(entries)
}

module.exports = { getTotalTechstack }