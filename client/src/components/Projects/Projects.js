import React from "react"
import { Typography, Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

import Container from "../Layout/Container.js"
import ProjectCard from "../ProjectCard.js"
import StripesBackground from "../Background/StripesBackground.js"
import useAPIData from "../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    projects: {
        position: "relative"
    },

    content: {
        position: "relative",
        padding: `100px 0 150px 0`
    },
    
    title: {
        marginBottom: theme.spacing(10),
        color: theme.palette.common.white
    }
}))

function Projects() {
    const classes = useStyles()

    const { data, isLoading } = useAPIData("getProjects")

    return (
        <div className={classes.projects}>
            <StripesBackground/>
            
            <Container>
                <div className={classes.content}>
                    <Typography variant="h3" className={classes.title} align="center" data-shootable>Projects</Typography>

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
                        ) : data.map((project, i) => (
                            <Grid item xs container justify="center" key={i}>
                                <ProjectCard data={project}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

export default Projects