import React from "react"
import clsx from "clsx"
import { Typography, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MailIcon from "@material-ui/icons/Email"

const useStyles = makeStyles(theme => ({
    primary: {
        marginBottom: theme.spacing(2)
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
    }
}))

function Text() {
    const classes = useStyles()

    return (
        <div>
            <Typography variant="h3" className={classes.primary}>Merlin Moelter</Typography>
            <Typography variant="h3" className={classes.secondary}>Programming with passion</Typography>

            <Grid container spacing={2}>
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