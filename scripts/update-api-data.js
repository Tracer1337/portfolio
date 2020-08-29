const path = require("path")
const { makeRunnable, run } = require("@m.moelter/task-runner")

if (require.main === module) {
    require("dotenv").config({ path: path.join(__dirname, "..", ".env") })
}

const Project = require("../app/Models/Project.js")
const { fetchMultipleAPIData } = require("../app/Services/APIServiceProvider.js")
const { createConnection } = require("../database/index.js")
const { readFileAsync } = require("../app/utils")

const ROOT_DIR = path.join(__dirname, "..")
const PROJECTS_DIR = path.join(ROOT_DIR, "content", "projects")

const runnable = makeRunnable(async () => {
    if (require.main === module) {
        global.db = await createConnection()
    }

    // Store new projects
    await run(async () => {
        // Load projects.json
        const projectFileContent = await readFileAsync(path.join(PROJECTS_DIR, "projects.json"))
        const projects = JSON.parse(projectFileContent.toString())

        // Update projects
        await Promise.all(projects.map(async (project) => {
            const model = await Project.findBy("slug", project.slug)

            // Fetch API data from given endpoints
            const apiData = await fetchMultipleAPIData(model.apis)

            model.apis = JSON.stringify(apiData)

            // Update project in database
            await model.update()
        }))
    }, "Updating API Data")

    if (require.main === module) {
        db.end()
    }
})

// Run script if called throug command line
if (require.main === module) {
    runnable()
}

module.exports = runnable