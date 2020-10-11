const { google } = require("googleapis")
const path = require("path")

/**
 * Set google apis authorization
 */
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "..", process.env.GOOGLE_APPLICATION_CREDENTIALS),
    scopes: ["https://www.googleapis.com/auth/analytics.readonly"]
})

google.options({ auth })

module.exports = {
    assetTypes: {
        thumbnail: "thumbnail",
        gallery: "gallery",
        techstackIcon: "techstack-icon"
    },

    routes: {
        storage: "/storage"
    },

    // Used for image compression
    maxImageWidth: 1920,
    imageFormat: "webp",

    api: {
        googleAnalytics: {
            name: "google_analytics"
        },

        googlePlay: {
            name: "google_play",

            routes: {
                base: "https://play.google.com",
                appDetails: "https://play.google.com/store/apps/details?id="
            },

            downloadsSelector: "main > c-wiz:last-child > div > div:last-child > div > div:nth-child(3) > span > div > span"
        },

        npm: {
            name: "npm",

            routes: {
                base: "https://api.npmjs.org",
                downloadsLastMonth: "https://api.npmjs.org/downloads/point/last-month"
            }
        }
    },

    tempDir: "temp"
}