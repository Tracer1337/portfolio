import React from "react"
import clsx from "clsx"
import { Typography } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    grid: {
        display: "flex",
        flexWrap: "wrap"
    },

    item: {
        margin: theme.spacing(2),
        width: theme.spacing(8),
        height: theme.spacing(11)
    },

    iconWrapper: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        padding: theme.spacing(1.5),
        display: "flex",
        alignItems: "center"
    },

    icon: {
        fontSize: theme.spacing(5)
    },

    caption: {
        fontWeight: 200,
        textAlign: "center"
    },

    [theme.breakpoints.down("md")]: {
        grid: {
            justifyContent: "center"
        },

        item: {
            width: theme.spacing(6)
        },

        iconWrapper: {
            width: theme.spacing(6),
            height: theme.spacing(6),
            padding: theme.spacing(1)
        },

        icon: {
            fontSize: theme.spacing(4)
        },

        caption: {
            fontSize: theme.typography.overline.fontSize
        }
    }
}))

function Techstack({ data, isLoading }) {
    const classes = useStyles()

    if (!isLoading) {
        data = data.sort((a, b) => a.name.localeCompare(b.name))
    }

    return (
        <div className={classes.grid}>
            { isLoading ? (
                Array(12).fill(0).map((_, i) => (
                    <Skeleton
                        variant="rect"
                        key={i}
                        className={classes.item}
                    />
                ))
            ) : (
                data.map((entry, i) => (
                    <div key={i} className={classes.item}>
                        <div className={classes.iconWrapper}>
                            <i className={clsx(entry.icon || `devicon-${entry.name.toLowerCase()}-plain`, classes.icon)}/>
                        </div>

                        <Typography variant="body2" className={classes.caption}>
                            { entry.name }
                        </Typography>
                    </div>
                ))
            )}
        </div>
    )
}

export default Techstack