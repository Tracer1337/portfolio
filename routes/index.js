const path = require("path")
const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const rootRouter = express.Router()

rootRouter.use("/api", require("./api"))

if (process.env.NODE_ENV === "development") {
    // Proxy react dev-server
    rootRouter.use("/", createProxyMiddleware({
        target: "http://localhost:3000/",
        ws: true
    }))
} else {
    // Serve static files
    rootRouter.use(express.static(path.join(__dirname, "..", "public")))

    // Server React App on /*
    rootRouter.get("/*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "..", "public", "index.html"))
    )
}

module.exports = rootRouter
