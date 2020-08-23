import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import StripesBottom from "./StripesBottom.js"
import StripesTop from "./StripesTop.js"

const useStyles = makeStyles(theme => ({
    background: {
        position: "absolute",
        width: "100vw",
        height: "100%",
        backgroundColor: "#0a2540",
        transform: "skewY(-6deg)"
    }
}))

function Background() {
    const classes = useStyles()

    return (
        <div className={classes.background}>
            <StripesTop/>
            <StripesBottom/>
        </div>
    )
}

export default Background