import React from "react"
import { graphql } from "gatsby"
import {
    Button,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    Grid,
    makeStyles
} from "@material-ui/core"
import { Link } from "gatsby-theme-material-ui"

import Layout from "../components/Layout"
import { ProjectsQuery } from "../../generated/graphql-types"

type Project = ProjectsQuery["projects"]["nodes"][0]

type Props = {
    data: ProjectsQuery
}

const useStyles = makeStyles({
    media: {
        height: 200
    }
})

export default function IndexPage(
    { data: { projects, thumbnails } }
: Props) {
    const classes = useStyles()

    const getThumbnail = (project: Project) => {
        return thumbnails.nodes.find((node) => node.projectSlug === project.slug)
    }

    return (
        <Layout>
            <Grid container>
                {projects.nodes.map((project) => (
                    <Grid item sm={4} key={project.slug}>
                        <Card>
                            <CardHeader
                                title={project.name}
                                subheader={project.description}
                            />

                            <CardMedia
                                className={classes.media}
                                image={getThumbnail(project).publicURL}
                                title="Thumbnail"
                            />

                            <CardActions>
                                <Link to={`/projects/${project.slug}`}>
                                    <Button>Open Project Page</Button>
                                </Link>
                                <Link to={project.url} target="_blank">
                                    <Button>Open Website</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    )
}

export const query = graphql`
    query Projects {
        projects: allProject {
            nodes {
                slug
                description
                name
                url
            }
        }
        thumbnails: allFile(filter: {
            sourceInstanceName: {eq: "projects"},
            name: {eq: "thumbnail"}
        }) {
            nodes {
                publicURL
                projectSlug: relativeDirectory
            }
        }
    }
`
