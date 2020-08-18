require("dotenv").config()
require("./app/utils")
const express = require("express")
const routes = require("./routes")
const boot = require("./app/Boot")

const app = express()

// Support form data
app.use(express.urlencoded({
    extended: true
}))

// Support json
app.use(express.json())

// Use Routes
app.use("/", routes)

;(async () => {
    // Startup
    if (process.env.NODE_ENV !== "development" || true) {
        await boot()
    }
    
    // Start server on port specified in .env
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port", process.env.PORT)
    })
})()