const path = require("path")

exports.createSchemaCustomization = ({ actions }) => {
    const typeDefs = `
        type Project implements Node {
            name: String!,
            slug: String!,
            url: String!,
            description: String!,
            embed: Boolean!
        }
    `
    actions.createTypes(typeDefs)
}

exports.sourceNodes = async (args) => {
    const projects = args
        .getNodesByType("Directory")
        .filter((node) => node.sourceInstanceName === "projects")
        .filter((node) => node.relativePath.length > 0)
    await Promise.all(projects.map((node) =>
        createProjectFields({ ...args, node })
    ))
}

exports.createPages = async (args) => {
    await createProjectPages(args)
}

async function createProjectFields({
    node,
    actions,
    createContentDigest,
    getNodesByType,
    createNodeId
}) {
    const projectFile = require(
        findProjectFileNodeOfProject({ node, getNodesByType }).absolutePath
    )
    actions.createNode({
        ...projectFile,
        id: createNodeId(projectFile.slug),
        parent: null,
        internal: {
            type: "Project",
            content: JSON.stringify(projectFile),
            contentDigest: createContentDigest(
                JSON.stringify(projectFile)
            )
        }
    })
}

async function createProjectPages({ graphql, actions }) {
    const projectPage = path.resolve("src/templates/project.tsx")
    const result = await graphql(`
        query ProjectsQuery {
            allProject {
                nodes {
                    id
                    slug
                }
            }
        }
    `)
    result.data.allProject.nodes.forEach((node) => {
        actions.createPage({
            path: `projects/${node.slug}`,
            component: projectPage,
            context: {
                slug: node.slug
            }
        })
    })
}

function findProjectFileNodeOfProject(args) {
    return args.getNodesByType("File")
        .filter((node) => node.sourceInstanceName === "projects")
        .filter((node) => node.relativeDirectory === args.node.name)
        .find((node) => node.name === "project")
}
