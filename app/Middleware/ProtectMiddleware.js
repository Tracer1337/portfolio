// Authroize request
async function ProtectMiddleware(req, res, next) {
    // Break if no Authorization header is set
    if(!req.header("Authorization")) {
        return res.status(401).send("Not authorized")
    }

    // Get password from Authorization header
    const password = req.header("Authorization")

    // Check if the password is correct
    const isAuthorized = password === process.env.PASSWORD

    if (!isAuthorized) {
        return res.status(401).send("Invalid password")
    }

    next()
}

module.exports = ProtectMiddleware 