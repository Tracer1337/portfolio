import React from "react"
import clsx from "clsx"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    textWrapper: {
        position: "relative",
        fontWeight: 500
    },

    text: {
        fontWeight: 700
    },

    textBlend: {
        mixBlendMode: "color-burn"
    },

    textMask: {
        position: "absolute",
        top: 0,
        left: 0,
        opacity: .7
    },

    [theme.breakpoints.down("md")]: {
        text: {
            textAlign: "center"
        },

        textMask: {
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%"
        }
    }
}))

function MaskedText({ children }) {
    const classes = useStyles()

    return (
        <div className={classes.textWrapper} data-shootable>
            <Typography variant="h2" className={clsx(classes.text, classes.textBlend)}>{children}</Typography>
            <Typography variant="h2" className={clsx(classes.text, classes.textMask)}>{children}</Typography>
        </div>
    )
}

export default MaskedText