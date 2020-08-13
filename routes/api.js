const express = require("express")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")

const WebhookController = require("../app/Controllers/WebhookController.js")

const router = express.Router()

router.post("/webhooks/load-projects", WebhookController.loadProjects)
router.post("/webhooks/update", WebhookController.updateWebhooks)

module.exports = router