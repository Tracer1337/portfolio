import React from "react"
import { Typography, Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

import ProjectCard from "../ProjectCard.js"
import useAPIData from "../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(10)
    }
}))

function Projects() {
    const classes = useStyles()

    const { data, isLoading } = useAPIData("getProjects")

    return (
        <div>
            <Typography variant="h3" className={classes.title} align="center">Projects</Typography>

            <Grid container spacing={4}>
                { isLoading ? (
                    Array(6).fill(0).map((_, i) => (
                        <Grid item xs container justify="center" key={i}>
                            <Skeleton
                                variant="rect"
                                width={330}
                                height={356}
                            />
                        </Grid>
                    ))
                ) : data.sort((a, b) => a.position - b.position).map((project, i) => (
                    <Grid item xs container justify="center" key={i}>
                        <ProjectCard data={project}/>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default Projects