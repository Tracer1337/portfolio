const { Octokit } = require("@octokit/rest")

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: "portfolio"
})

/**	
 * Register webhook for repo defined in .env
 */
async function registerWebhook() {
    console.log("Register Webhook")

    // List webhooks of repository	
    const { data: webhooks } = await octokit.request("GET /repos/:owner/:repo/hooks", {
        owner: process.env.GITHUB_USERNAME,
        repo: process.env.GITHUB_REPO
    })

    // Check if webhook exists	
    const hook = webhooks.find(hook => hook.type === "Repository")
    const hasWebhook = !!hook

    if (hasWebhook) {
        // Delete webhook	
        await octokit.request("DELETE /repos/:owner/:repo/hooks/:hook_id", {
            owner: process.env.GITHUB_USERNAME,
            repo: process.env.GITHUB_REPO,
            hook_id: hook.id
        })
    }

    // Create webhook	
    await octokit.request("POST /repos/:owner/:repo/hooks", {
        owner: process.env.GITHUB_USERNAME,
        repo: process.env.GITHUB_REPO,
        config: {
            url: process.env.GITHUB_WEBHOOK_URL,
            content_type: "json"
        }
    })

    console.log("Register Webhook Done")
}

module.exports = { registerWebhook }