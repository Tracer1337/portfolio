const ContentLoader = require("../Services/ContentLoader")

async function boot() {
    await ContentLoader.loadContent()
}

module.exports = boot
