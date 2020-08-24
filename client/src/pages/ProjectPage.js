import React, { useEffect } from "react"
import clsx from "clsx"
import { useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Grid, Typography, Button } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Container from "../components/Layout/Container.js"
import useAPIData from "../utils/useAPIData.js"
import ImageGrid from "../components/ImageGrid/ImageGrid.js"
import Markdown from "../components/Markdown.js"
import Techstack from "../components/Techstack.js"
import { makeTitle } from "../utils"

const useStyles = makeStyles(theme => ({
    section: {
        marginTop: theme.spacing(6)
    },

    content: {
        position: "relative"
    },

    title: {
        fontWeight: 500
    },

    [theme.breakpoints.down("sm")]: {
        content: {
            flexDirection: "column"
        },

        openButton: {
            margin: `${theme.spacing(1)}px 0`
        }
    }
}))

function ProjectPage() {
    const { slug } = useParams()

    const classes = useStyles()
    
    const { isLoading, data } = useAPIData("getProjects")

    const project = data?.find(project => project.slug === slug)

    const gallery = project?.assets.filter(asset => asset.type === "gallery") || []

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <Layout>
            <Helmet>
                <title>{ makeTitle(project?.name) }</title>
            </Helmet>

            <Container>
                <Grid className={clsx(classes.section, classes.content)} container spacing={2}>
                    <Grid container item xs direction="column">
                        <Grid item xs>
                            <Typography variant="h4" className={classes.title}>{ project?.name }</Typography>
                            { isLoading ? <Skeleton variant="rect" height={240} /> : (
                                <Markdown source={project.readme} />
                            ) }
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" href={project?.website} target="_blank" className={classes.openButton}>
                                Open
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid item xs>
                        { isLoading ? <Skeleton variant="rect" height={240} /> : (
                            <Techstack data={project.techstack || []} />
                        ) }
                    </Grid>
                </Grid>

                <div className={classes.section}>
                    { !isLoading && <ImageGrid images={gallery.map(image => image.path)} /> }
                </div>
            </Container>
        </Layout>
    )
}

export default ProjectPage