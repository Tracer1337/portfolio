const GitHubServiceProvider = require("../Services/GitHubServiceProvider.js")
const WebhookServiceProvider = require("../Services/WebhookServiceProvider.js")

/**
 * Keep track of webhooks, since they emit a first event when they are
 * registered and this event request should be ignored
 */
const webhooks = new Set()

async function loadProjects(req, res) {
    if (req.body.repository) {
        const repo = req.body.repository.name
    
        if (!webhooks.has(repo)) {
            webhooks.add(repo)
            return res.end()
        }
    }
    
    await GitHubServiceProvider.loadProjects()
    
    res.end()
}

async function updateWebhooks(req, res) {
    webhooks.clear()

    await WebhookServiceProvider.registerWebhooks({ update: true })
    
    res.end()
}

module.exports = { loadProjects, updateWebhooks }