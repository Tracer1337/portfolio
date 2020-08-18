const express = require("express")

const WebhooksController = require("../app/Controllers/WebhooksController.js")

const router = express.Router()

router.post("/load-projects", WebhooksController.loadProjects)

module.exports = router