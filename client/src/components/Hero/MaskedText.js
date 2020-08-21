import React from "react"
import clsx from "clsx"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    textWrapper: {
        position: "relative",
        fontWeight: 500,
        height: 72
    },

    text: {
        position: "absolute",
        top: 0,
        left: 0,
        fontWeight: 700
    },

    textBlend: {
        mixBlendMode: "color-burn"
    },

    textDarken: {
        opacity: .6
    },

    [theme.breakpoints.down("md")]: {
        text: {
            left: "50%",
            transform: "translateX(-50%)"
        }
    }
}))

function MaskedText({ children }) {
    const classes = useStyles()

    return (
        <div className={classes.textWrapper}>
            <Typography variant="h2" className={clsx(classes.text, classes.textBlend)}>{children}</Typography>
            <Typography variant="h2" className={clsx(classes.text, classes.textDarken)}>{children}</Typography>
        </div>
    )
}

export default MaskedText