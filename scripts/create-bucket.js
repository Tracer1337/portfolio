const path = require("path")
const chalk = require("chalk")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

const StorageFacade = require("../app/Facades/StorageFacade.js")

console.log("Creating bucket...")

StorageFacade.createBucket().then(({ Bucket }) => {
    console.log(chalk.green("Created bucket " + Bucket))
})