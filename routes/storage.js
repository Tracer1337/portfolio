const express = require("express")

const StorageController = require("../app/Controllers/StorageController.js")

const router = express.Router()

router.get("/:file", StorageController.getFile)

module.exports = router