require("dotenv").config()
const express = require("express")
const CronJob = require("cron").CronJob

require("./app/utils")
const { createConnection } = require("./database")
const routes = require("./routes")

const { registerWebhooks } = require("./app/Services/WebhookServiceProvider.js")
const { loadProjects } = require("./app/Services/GitHubServiceProvider.js")

// Connect to database
global.db = createConnection()

const app = express()

// Support form data
app.use(express.urlencoded({
    extended: true
}))

// Support json
app.use(express.json())

// Use Routes
app.use("/", routes)

// Start server on port specified in .env
app.listen(process.env.PORT, async () => {
    console.log("Server is running on port", process.env.PORT)

    // Startup
    if (process.env.NODE_ENV !== "development") {
        // Initial webhook registering
        await registerWebhooks({ update: true })

        // Look for new projects at 00:00
        new CronJob("0 0 * * *", async () =>  {

            /**
             * TODO: CLEAR WEBHOOKS SET IN WEBHOOKSCONTROLLER
             */

            await registerWebhooks()
            await loadProjects()
        }, null, true, "Europe/Berlin").start()
    }
})