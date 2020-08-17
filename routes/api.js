const express = require("express")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")

const ResourceController = require("../app/Controllers/ResourceController.js")

const router = express.Router()

router.get("/resources/techstack", ResourceController.getTotalTechstack)
router.get("/resources/projects", ResourceController.getProjects)

module.exports = router