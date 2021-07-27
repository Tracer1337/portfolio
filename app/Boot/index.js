const chokidar = require("chokidar")

const { createConnection } = require("../../database")
const loadProjects = require("../../scripts/load-projects.js")

async function boot() {
    global.db = await createConnection()
    
    if (process.env.NODE_ENV === "development") {
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
