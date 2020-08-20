import React from "react"
import clsx from "clsx"
import { Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MailIcon from "@material-ui/icons/Email"

const useStyles = makeStyles(theme => ({
    primaryWrapper: {
        marginBottom: theme.spacing(1)
    },

    primary: {
        marginBottom: theme.spacing(1),
        fontWeight: 500
    },

    secondary: {
        fontWeight: 200,
        marginBottom: theme.spacing(3)
    },

    link: {
        textDecoration: "none",
        display: "block"
    },

    icon: {
        fontSize: 32,
        color: theme.palette.text.primary
    },

    [theme.breakpoints.down("md")]: {
        container: {
            margin: `${theme.spacing(8)}px 0`
        },

        primary: {
            textAlign: "center"
        },

        secondary: {
            textAlign: "center",
            fontSize: theme.typography.h5.fontSize
        },

        linksWrapper: {
            justifyContent: "center"
        }
    }
}))

function Text() {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.primaryWrapper}>
                <Typography variant="h3" className={classes.primary}>Websites</Typography>
                <Typography variant="h3" className={classes.primary}>Mobile Apps</Typography>
                <Typography variant="h3" className={classes.primary}>Embedded Devices</Typography>
            </div>

            <Typography variant="h3" className={classes.secondary}>on a whole new level</Typography>

            <Grid container spacing={2} className={classes.linksWrapper}>
                <Grid item>
                    <a href="https://github.com/Tracer1337" target="_blank" rel="noopener noreferrer" className={classes.link}>
                        <i className={clsx(classes.icon, "devicon-github-plain")}/>
                    </a>
                </Grid>

                <Grid item>
                    <a href="mailto:merlin.moelter@gmail.com" target="_blank" rel="noopener noreferrer" className={classes.link}>
                        <MailIcon className={classes.icon}/>
                    </a>
                </Grid>
            </Grid>
        </div>
    )
}

export default Text