const express = require("express")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")

const WebhookController = require("../app/Controllers/WebhookController.js")
const ResourceController = require("../app/Controllers/ResourceController.js")

const router = express.Router()

router.post("/webhooks/load-projects", WebhookController.loadProjects)
router.post("/webhooks/update", WebhookController.updateWebhooks)

router.post("/actions/load-projects", ProtectMiddleware, WebhookController.loadProjects)
router.post("/actions/test", ProtectMiddleware, (req, res) => res.send("Success"))

router.get("/resources/techstack", ResourceController.getTotalTechstack)
router.get("/resources/projects", ResourceController.getProjects)

module.exports = router