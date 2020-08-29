const CronJob = require("cron").CronJob
const chokidar = require("chokidar")

const CIServiceProvider = require("../Services/CIServiceProvider")
const { createConnection } = require("../../database")
const updateAPIData = require("../../scripts/update-api-data.js")

async function boot() {
    // Connect to database
    global.db = await createConnection()
    
    if (process.env.NODE_ENV === "production") {
        // Init CI hooks
        // await CIServiceProvider.registerWebhook()

        // Automatically update projects
        new CronJob("0 * * * *", updateAPIData, null, true, "Europe/Berlin").start()
    } else {
        // Update projects whenever content folder has changed
        let isActive = false

        chokidar.watch("./content")
            .on("ready", () => isActive = true)
            .on("all", async () => {
                if (isActive) {
                    isActive = false
                    await loadProjects()
                    isActive = true
                }
            })
    }
}

module.exports = boot