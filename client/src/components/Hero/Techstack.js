import React from "react"
import { Typography } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

import useAPIData from "../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: 200,
        textAlign: "center",
        marginBottom: theme.spacing(4)
    },

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
        width: 64,
        height: 64,
        display: "flex",
        alignItems: "center"
    },

    icon: {
        maxWidth: "100%",
        maxHeight: "100%",
        "-webkit-filter": "grayscale(1)",
        "filter": "grayscale(1)"
    },

    caption: {
        fontWeight: 200,
        textAlign: "center"
    }
}))

function Techstack() {
    const classes = useStyles()

    let { isLoading, data } = useAPIData("getTotalTechstack")

    if (!isLoading) {
        data = data.sort((a, b) => a.name.localeCompare(b.name))
    }

    return (
        <div>
            <Typography variant="h4" className={classes.title}>My Techstack</Typography>

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
                                { entry.icon && (
                                        <img alt="icon" src={window.location.origin + entry.icon.path} className={classes.icon}/>
                                ) }
                            </div>

                            <Typography variant="body2" className={classes.caption}>
                                { entry.name }
                            </Typography>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Techstack