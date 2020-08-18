import React from "react"
import { useHistory } from "react-router-dom"
import { Typography, IconButton, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ChevronLeft from "@material-ui/icons/ChevronLeft"

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        justifyContent: "space-between"
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
    },

    backButton: {
        marginRight: theme.spacing(2),

        "& svg": {
            color: theme.palette.text.primary
        }
    }
}))

function Header({ title, backButton }) {
    const classes = useStyles()

    const history = useHistory()

    return (
        <header className={classes.container}>
            <div>
                <Grid container>
                    { backButton && (
                        <IconButton onClick={history.goBack} size="small" className={classes.backButton}>
                            <ChevronLeft/>
                        </IconButton>
                    ) }

                    { title && <Typography variant="h5">{ title }</Typography> }
                </Grid>
            </div>

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