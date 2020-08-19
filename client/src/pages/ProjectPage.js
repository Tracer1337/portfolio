import React from "react"
import { useParams } from "react-router-dom"
import { Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import useAPIData from "../utils/useAPIData.js"
import ImageGrid from "../components/ImageGrid/ImageGrid.js"
import Markdown from "../components/Markdown.js"
import Techstack from "../components/Techstack.js"

const useStyles = makeStyles(theme => ({
    section: {
        marginTop: theme.spacing(4)
    }
}))

function ProjectPage() {
    const { slug } = useParams()

    const classes = useStyles()
    
    const { isLoading, data } = useAPIData("getProjects")

    const project = data?.find(project => project.slug === slug)

    const gallery = project?.assets.filter(asset => asset.type === "gallery") || []

    return (
        <Layout
            HeaderProps={{
                title: project?.name,
                backButton: true
            }}
        >
            <Grid className={classes.section} container spacing={2}>
                <Grid item xs>
                    { isLoading ? <Skeleton variant="rect" height={240} /> : (
                        <Markdown source={project.readme} />
                    ) }
                </Grid>

                <Grid item xs>
                    { isLoading ? <Skeleton variant="rect" height={240} /> : (
                        <Techstack data={project.techstack || []} />
                    ) }
                </Grid>
            </Grid>

            <div className={classes.section}>
                <ImageGrid images={gallery.map(image => image.path)} isLoading={isLoading} />
            </div>
        </Layout>
    )
}

export default ProjectPage