const { Octokit } = require("@octokit/rest")

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: "portfolio"
})

/**
 * Register webhooks to all repositories
 */
async function registerWebhooks(options = { update: false }) {
    console.log("Register Webhooks")

    // Get user's repositories
    let { data: repos } = await octokit.repos.listForAuthenticatedUser()
    
    // Remove repos with foreign ownership
    repos = repos.filter(repo => repo.owner.login === process.env.GITHUB_USERNAME)

    await Promise.all(repos.map(async repo => {
        // List webhooks of repository
        const { data: webhooks } = await octokit.request("GET /repos/:owner/:repo/hooks", {
            owner: process.env.GITHUB_USERNAME,
            repo: repo.name
        })

        // Check if webhook exists
        const hook = webhooks.find(hook => hook.type === "Repository")
        const hasWebhook = !!hook

        if (hasWebhook && options.update) {
            // Delete webhook
            await octokit.request("DELETE /repos/:owner/:repo/hooks/:hook_id", {
                owner: process.env.GITHUB_USERNAME,
                repo: repo.name,
                hook_id: hook.id
            })
        }
        
        if (!hasWebhook || options.update) {
            // Create webhook
            await octokit.request("POST /repos/:owner/:repo/hooks", {
                owner: process.env.GITHUB_USERNAME,
                repo: repo.name,
                config: {
                    url: process.env.GITHUB_WEBHOOK_URL,
                    content_type: "json"
                }
            })
        }
    }))

    console.log("Register Webhooks Done")
}

module.exports = { registerWebhooks }