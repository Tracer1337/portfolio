import React, { useEffect } from "react"
import clsx from "clsx"
import { useParams, Link } from "react-router-dom"
import { Helmet } from "react-helmet"
import { Grid, Typography, Button, useMediaQuery } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import ChevronRightIcon from "@material-ui/icons/ChevronRight"

import Layout from "../components/Layout/Layout.js"
import Container from "../components/Layout/Container.js"
import useAPIData from "../utils/useAPIData.js"
import ImageGrid from "../components/ImageGrid/ImageGrid.js"
import Markdown from "../components/Markdown.js"
import Techstack from "../components/Techstack.js"
import { makeTitle } from "../utils"

const useStyles = makeStyles(theme => ({
    navItem: {
        width: "50%"
    },

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
        nav: {
            justifyContent: "space-between"
        },

        navItem: {
            width: "unset"
        },

        content: {
            flexDirection: "column"
        },

        openButton: {
            margin: `${theme.spacing(1)}px 0`
        }
    }
}))

function ProjectPage() {
    const theme = useTheme()
    
    const isMedium = useMediaQuery(theme.breakpoints.down("sm"))

    const { slug } = useParams()

    const classes = useStyles()
    
    const { isLoading, data } = useAPIData("getProjects")

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const project = data?.find(project => project.slug === slug)

    const gallery = project?.assets.filter(asset => asset.type === "gallery") || []

    const projectIndex = data?.findIndex(({ id }) => project.id === id)
    const prevProject = data?.[projectIndex - 1]
    const nextProject = data?.[projectIndex + 1]

    return (
        <Layout
            HeaderProps={{
                centerElement: (
                    <Grid container wrap="nowrap" spacing={2} className={classes.nav}>
                        <Grid item container justify="flex-end" className={classes.navItem}>
                            { prevProject && (
                                <Link to={"/project/" + prevProject.slug}>
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        startIcon={<ChevronLeftIcon/>}
                                        data-shootable
                                    >{ isMedium ? "Previous" : prevProject.name }</Button>
                                </Link>
                            ) }
                        </Grid>

                        <Grid item className={classes.navItem}>
                            { nextProject && (
                                <Link to={"/project/" + nextProject.slug}>
                                    <Button
                                        variant="text"
                                        color="inherit"
                                        endIcon={<ChevronRightIcon/>}
                                        data-shootable
                                    >{ isMedium ? "Next" : nextProject.name }</Button>
                                </Link>
                            ) }
                        </Grid>
                    </Grid>
                )
            }}
        >
            <Helmet>
                <title>{ makeTitle(project?.name) }</title>
            </Helmet>

            <Container>
                <Grid className={clsx(classes.section, classes.content)} container spacing={2}>
                    <Grid container item xs direction="column">
                        <Grid item xs>
                            <Typography variant="h4" className={classes.title} data-shootable>{ project?.name }</Typography>
                            { isLoading ? <Skeleton variant="rect" height={240} /> : (
                                <Markdown source={project.readme} />
                            ) }
                        </Grid>

                        <Grid item>
                            <Button variant="contained" color="primary" href={project?.website} target="_blank" className={classes.openButton} data-shootable>
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