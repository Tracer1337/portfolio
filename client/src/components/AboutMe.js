import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Markdown from "./Markdown.js"
import useAPIData from "../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(10)
    },

    content: {
        textAlign: "center"
    }
}))

function AboutMe() {
    const classes = useStyles()

    const { data } = useAPIData("getAboutMeText")

    return (
        <div>
            <Typography variant="h3" align="center" className={classes.title}>About Me</Typography>

            <Markdown source={data} className={classes.content}/>
        </div>
    )
}

export default AboutMe