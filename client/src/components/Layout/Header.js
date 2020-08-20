import React from "react"
import { Link } from "react-router-dom"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "space-between",

        "& a": {
            color: theme.palette.primary.contrastText
        }
    },

    nav: {
        display: "flex",

        "& a": {
            marginRight: theme.spacing(8),

            "&:last-child": {
                marginRight: 0
            }
        }
    },

    [theme.breakpoints.down("md")]: {
        container: {
            "& h5": {
                fontSize: theme.typography.body1.fontSize,
            }
        },

        nav: {
            "& a": {
                marginRight: theme.spacing(4),

                "&:last-child": {
                    marginRight: 0
                }
            }
        }
    }
}))

function Header() {
    const classes = useStyles()

    return (
        <header className={classes.container}>
            <div>
                <Link to="/">
                    <Typography variant="h5">Merlin Moelter</Typography>
                </Link>
            </div>

            <nav className={classes.nav}>
                <a href="#projects">
                    <Typography variant="h5">Projects</Typography>
                </a>
                
                <a href="#about-me">
                    <Typography variant="h5">About Me</Typography>
                </a>
            </nav>
        </header>
    )
}

export default Header