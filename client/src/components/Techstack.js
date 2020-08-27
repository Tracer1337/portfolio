import React from "react"
import { Typography, Card, Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    card: {
        position: "relative"
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
        width: theme.spacing(5)
    },

    caption: {
        fontWeight: 200,
        textAlign: "center"
    },

    [theme.breakpoints.down("md")]: {
        grid: {
            justifyContent: "space-evenly"
        },

        item: {
            width: theme.spacing(6),
            height: 68
        },

        iconWrapper: {
            width: theme.spacing(6),
            height: theme.spacing(6),
            padding: theme.spacing(1)
        },

        icon: {
            width: theme.spacing(4)
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
        <Card elevation={5} className={classes.card}>
            <Grid container className={classes.grid}>
                { isLoading ? (
                    Array(12).fill(0).map((_, i) => (
                        <Skeleton
                            variant="rect"
                            key={i}
                            className={classes.item}
                        />
                    ))
                ) : (
                    data.map((entry, i) => {
                        let iconName = entry.icon && entry.icon.toLowerCase().match(/^[^-]+/)[0]
                        let fileName = entry.icon?.toLowerCase()

                        if (!iconName) {
                            iconName = entry.name.toLowerCase()
                            fileName = iconName + "-original"
                        }

                        let icon

                        try {
                            icon = require(`../assets/icons/${iconName}/${fileName}.svg`)
                        } catch {}

                        if (!icon) {
                            console.log({ icon, iconName, entry })
                            return null
                        }

                        return (
                            <div key={i} className={classes.item} data-shootable>
                                <div className={classes.iconWrapper}>
                                    <img src={icon} alt={iconName} className={classes.icon} />
                                </div>

                                <Typography variant="body2" className={classes.caption}>
                                    {entry.name}
                                </Typography>
                            </div>
                        )
                    })
                )}
            </Grid>
        </Card>
    )
}

export default Techstack