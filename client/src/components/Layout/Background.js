import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import background0 from "../../assets/images/background_0.svg"

const useStyles = makeStyles(theme => ({
    container: {
        zIndex: -1,
        position: "absolute",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${background0})`,
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }
}))

function Background() {
    const classes = useStyles()

    return (
        <div className={classes.container}/>
    )
}

export default Background