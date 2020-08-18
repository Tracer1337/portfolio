const express = require("express")

const ResourceController = require("../app/Controllers/ResourceController.js")

const router = express.Router()

router.get("/resources/techstack", ResourceController.getTotalTechstack)
router.get("/resources/projects", ResourceController.getProjects)
router.get("/resources/aboutme", ResourceController.getAboutMe)

module.exports = router