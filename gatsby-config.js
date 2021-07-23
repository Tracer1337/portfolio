const path = require("path")

module.exports = {
    plugins: [
        "gatsby-theme-material-ui",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "projects",
                path: path.join(__dirname, "content", "projects")
            }
        },
        {
            resolve: "gatsby-plugin-graphql-codegen",
            options: {
                fileName: path.join(".", "generated", "graphql-types.ts")
            }
        }
    ]
}
