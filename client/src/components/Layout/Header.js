import React, { useState } from "react"
import { Link, useHistory, useLocation } from "react-router-dom"
import { Typography, IconButton } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import FlightIcon from "@material-ui/icons/Flight"

import Spaceship from "../Spaceship/Spaceship.js"

const useStyles = makeStyles(theme => ({
    header: {
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        color: theme.palette.primary.contrastText,

        "& a": {
            color: theme.palette.primary.contrastText
        }
    },

    brand: {
        zIndex: 100,

        "& h5": {
            fontWeight: 500
        }
    },

    center: {
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },

    nav: {
        display: "flex",
        zIndex: 100,

        "& a": {
            marginRight: theme.spacing(8),

            "&:last-child": {
                marginRight: 0
            }
        }
    },

    [theme.breakpoints.down("md")]: {
        header: {
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
    },

    [theme.breakpoints.down("sm")]: {
        header: {
            marginBottom: props => props.centerElement && 40,
        },

        center: {
            transform: "translateY(100%)"
        }
    }
}))

function Header({ centerElement }) {
    const history = useHistory()
    const location = useLocation()

    const classes = useStyles({ centerElement })

    const [isSpaceshipActive, setIsSpaceshipActive] = useState(false)

    const handleRedirect = () => {
        if (location.pathName !== "/") {
            history.push("/")
        }
    }

    return (
        <>
            { isSpaceshipActive && <Spaceship /> }

            <header className={classes.header}>
                <div className={classes.brand}>
                    <Link to="/" data-shootable>
                        <Typography variant="h5">Merlin Moelter</Typography>
                    </Link>
                </div>

                <div className={classes.center}>
                    { centerElement }
                </div>

                <nav className={classes.nav}>
                    {!isSpaceshipActive && (
                        <IconButton onClick={() => setIsSpaceshipActive(true)} size="small" style={{ marginRight: 64 }} color="inherit">
                            <FlightIcon/>
                        </IconButton>
                    ) }

                    <a href="#projects" onClick={handleRedirect} data-shootable>
                        <Typography variant="h5">Projects</Typography>
                    </a>
                    
                    <a href="#about-me" onClick={handleRedirect} data-shootable>
                        <Typography variant="h5">About Me</Typography>
                    </a>
                </nav>
            </header>
        </>
    )
}

export default Header