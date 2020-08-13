const GitHubServiceProvider = require("../Services/GitHubServiceProvider.js")
const WebhookServiceProvider = require("../Services/WebhookServiceProvider.js")

/**
 * Keep track of webhooks, since they emit a first event when they are
 * registered and this event request should be ignored
 */
const webhooks = new Set()

async function loadProjects(req, res) {
    const repo = req.body.repository.name

    if (!webhooks.has(repo)) {
        webhooks.add(repo)
        return res.end()
    }

    res.end()
    
    await GitHubServiceProvider.loadProjects()
}

async function updateWebhooks(req, res) {
    webhooks.clear()

    res.end()
    
    await WebhookServiceProvider.registerWebhooks({ update: true })
}

module.exports = { loadProjects, updateWebhooks }