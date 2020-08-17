import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Text from "./Text.js"
import Techstack from "./Techstack.js"

const useStyles = makeStyles(theme => ({
    container: {
        height: 740,
        display: "flex",
        alignItems: "center"
    },

    primary: {
        width: "50%"
    },

    secondary: {
        width: "50%",
        paddingLeft: theme.spacing(3)
    }
}))

function Hero() {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.primary}>
                <Text/>
            </div>

            <div className={classes.secondary}>
                <Techstack/>
            </div>
        </div>
    )
}

export default Hero