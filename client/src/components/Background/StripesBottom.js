import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    stripes: {
        position: "absolute",
        width: "100vw",
        height: 64,
        bottom: 0,
        transform: "translateY(100%)"
    },

    innerStripes: {
        position: "relative",
        width: "100%",
        height: "100%"
    },

    stripe: {
        position: "absolute",
        right: 0,
        height: 40
    },

    long: {
        width: 600,
        backgroundColor: theme.palette.stripes.primary
    },

    short: {
        width: 160,
        right: 300,
        transform: "translateY(calc(100% - 16px))",
        backgroundColor: theme.palette.stripes.secondary
    },

    overlayMask: {
        backgroundColor: "transparent",
        overflow: "hidden",

        "& div": {
            backgroundColor: theme.palette.stripes.overlay
        }
    },

    [theme.breakpoints.down("md")]: {
        long: {
            width: 400
        },

        short: {
            right: 0
        }
    },

    [theme.breakpoints.down("xs")]: {
        long: {
            width: 200
        },

        short: {
            width: 80
        }
    }
}))

function StripesBottom() {
    const classes = useStyles()

    return (
        <div className={classes.stripes}>
            <div className={classes.innerStripes}>
                <div className={clsx(classes.stripe, classes.long)} data-shootable/>
                <div className={clsx(classes.stripe, classes.short)} data-shootable/>
                <div className={clsx(classes.stripe, classes.long, classes.overlayMask)}>
                    <div className={clsx(classes.stripe, classes.short)} data-shootable/>
                </div>
            </div>
        </div>
    )
}

export default StripesBottom