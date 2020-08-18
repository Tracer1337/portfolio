import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import background0 from "../../assets/images/background_0.svg"

const useStyles = makeStyles(theme => ({
    container: {
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: -1
    }
}))

function Background() {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <img src={background0} alt=""/>
        </div>
    )
}

export default Background