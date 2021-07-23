import React from "react"
import { graphql } from "gatsby"
import { Typography, Link, Button, Box, Paper, makeStyles } from "@material-ui/core"

import Layout from "../components/Layout"
import { ProjectQuery } from "../../generated/graphql-types"

type Props = {
    data: ProjectQuery
}

const useStyles = makeStyles({
    headline: {
        fontWeight: 200
    }
})

export default function ProjectPage({
    data: { project }
}: Props) {
    const classes = useStyles()
    
    return (
        <Layout>
            <Box mb={4}>
                <Typography variant="h1" className={classes.headline}>
                    {project.name}
                </Typography>
            </Box>

            <Box mb={4}>
                <Link href={project.url} target="_blank">
                    <Button variant="contained" color="primary">
                        Open in new tab
                    </Button>
                </Link>
            </Box>

            {project.embed && (
                <Paper variant="outlined">
                    <Box p={2} display="flex">
                        <iframe
                            src={project.url}
                            width="100%"
                            height="800"
                            loading="lazy"
                        />
                    </Box>
                </Paper>
            )}
        </Layout>
    )
}

export const query = graphql`
    query Project($slug: String!) {
        project(slug: {eq: $slug}) {
            url
            slug
            name
            description
            embed
        }
    }
`
