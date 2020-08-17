import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "flex-end"
    },

    nav: {
        display: "flex",

        "& a": {
            marginRight: theme.spacing(8),
            textDecoration: "none",
            color: theme.palette.text.primary,

            "&:last-child": {
                marginRight: 0
            }
        }
    }
}))

function Header() {
    const classes = useStyles()

    return (
        <header className={classes.container}>
            <nav className={classes.nav}>
                <a href="#projects">
                    <Typography variant="h5">Projects</Typography>
                </a>
                
                <a href="#about-me">
                    <Typography variant="h5">About Me</Typography>
                </a>

                <a href="#contact">
                    <Typography variant="h5">Contact</Typography>
                </a>
            </nav>
        </header>
    )
}

export default Header