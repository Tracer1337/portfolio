const express = require("express")

const ProtectMiddleware = require("../app/Middleware/ProtectMiddleware.js")
const StorageController = require("../app/Controllers/StorageController.js")
const { upload } = require("../app/utils")

const router = express.Router()

router.get("/:file", StorageController.getFile)
router.post("/", upload.single("image"), ProtectMiddleware, StorageController.storeFile)
router.delete("/:file", ProtectMiddleware, StorageController.deleteFile)

module.exports = router