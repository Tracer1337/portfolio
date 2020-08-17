import React from "react"
import { Typography } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

import ProjectCard from "../ProjectCard.js"
import useAPIData from "../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: "center",
        marginBottom: theme.spacing(10)
    }
}))

function Projects() {
    const classes = useStyles()

    const { data, isLoading } = useAPIData("getProjects")

    return (
        <div>
            <Typography variant="h3" className={classes.title}>Projects</Typography>

            { isLoading ? (
                Array(6).fill(0).map((_, i) => (
                    <Skeleton
                        variant="rect"
                        key={i}
                        width={350}
                        height={450}
                    />
                ))
            ) : data.map(project => <ProjectCard data={project} key={project.id}/>)}
        </div>
    )
}

export default Projects