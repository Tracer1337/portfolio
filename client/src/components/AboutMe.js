import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Markdown from "./Markdown.js"
import useAPIData from "../utils/useAPIData.js"
import StripesBackground from "./Background/StripesBackground.js"
import Container from "./Layout/Container.js"

const useStyles = makeStyles(theme => ({
    aboutme: {
        position: "relative",
        marginTop: 200
    },
    
    contentWrapper: {
        position: "relative",
        padding: "100px 0 150px 0"
    },

    title: {
        marginBottom: theme.spacing(10),
        color: theme.palette.common.white
    },

    content: {
        textAlign: "center",
        color: theme.palette.stripes.text
    }
}))

function AboutMe() {
    const classes = useStyles()

    const { data } = useAPIData("getAboutMeText")

    return (
        <div className={classes.aboutme}>
            <StripesBackground/>

            <Container>
                <div className={classes.contentWrapper}>
                    <Typography variant="h3" align="center" className={classes.title}>About Me</Typography>

                    <Markdown source={data} className={classes.content}/>
                </div>
            </Container>
        </div>
    )
}

export default AboutMe