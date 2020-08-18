const CIServiceProvider = require("../Services/CIServiceProvider")
const { createConnection } = require("../../database")
const CronJob = require("cron").CronJob

async function boot() {
    // Connect to database
    global.db = await createConnection()
    
    // Init CI hooks
    await CIServiceProvider.registerWebhook()
}

module.exports = boot