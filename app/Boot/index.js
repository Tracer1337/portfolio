const CIServiceProvider = require("../Services/CIServiceProvider")
const { createConnection } = require("../../database")
const CronJob = require("cron").CronJob

async function boot() {
    // Init CI hooks
    await CIServiceProvider.registerWebhook()
    
    // Connect to database
    global.db = await createConnection()
}

module.exports = boot