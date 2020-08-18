const CronJob = require("cron").CronJob

const CIServiceProvider = require("../Services/CIServiceProvider")
const { createConnection } = require("../../database")
const loadProjects = require("../../scripts/load-projects.js")

async function boot() {
    // Connect to database
    global.db = await createConnection()
    
    if (process.env.NODE_ENV === "production") {
        // Init CI hooks
        await CIServiceProvider.registerWebhook()

        // Automatically update projects
        new CronJob("0 * * * *", loadProjects, null, true, "Europe/Berlin").start()
    } else {
        // await loadProjects()
    }
}

module.exports = boot