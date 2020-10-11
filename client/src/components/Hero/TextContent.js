import React from "react"
import clsx from "clsx"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import MailIcon from "@material-ui/icons/Email"

import MaskedText from "./MaskedText.js"

const useStyles = makeStyles(theme => ({
    primaryWrapper: {
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

    linksWrapper: {
        position: "relative"
    },

    [theme.breakpoints.down("md")]: {
        container: {
            margin: `${theme.spacing(8)}px 0`
        },

        linksWrapper: {
            justifyContent: "center"
        }
    }
}))

function TextContent() {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <div className={classes.primaryWrapper}>
                <MaskedText>Programming is art.</MaskedText>
            </div>

            <Grid container spacing={2} className={classes.linksWrapper}>
                <Grid item>
                    <a href="https://github.com/Tracer1337" target="_blank" rel="noopener noreferrer" className={classes.link} data-shootable>
                        <i className={clsx(classes.icon, "devicon-github-plain")}/>
                    </a>
                </Grid>

                <Grid item>
                    <a href="mailto:merlin.moelter@gmail.com" target="_blank" rel="noopener noreferrer" className={classes.link} data-shootable>
                        <MailIcon className={classes.icon}/>
                    </a>
                </Grid>
            </Grid>
        </div>
    )
}

export default TextContent