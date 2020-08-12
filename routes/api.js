const express = require("express")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")

const ProcedureController = require("../app/Controllers/ProcedureController.js")

const router = express.Router()

router.get("/test/projects", ProcedureController.loadProjects)

module.exports = router