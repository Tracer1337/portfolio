const express = require("express")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")

const WebhookController = require("../app/Controllers/WebhookController.js")

const router = express.Router()

router.post("/webhooks/load-projects", WebhookController.loadProjects)
router.post("/webhooks/update", WebhookController.updateWebhooks)

router.post("/actions/load-projects", ProtectMiddleware, WebhookController.loadProjects)
router.post("/actions/test", ProtectMiddleware, (req, res) => res.send("Success"))

module.exports = router