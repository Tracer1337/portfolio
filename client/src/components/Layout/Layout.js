import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"

import HueNoise from "./HueNoise.js"
import Header from "./Header.js"
import Container from "./Container.js"

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(8)
    },

    [theme.breakpoints.down("md")]: {
        container: {
            marginTop: theme.spacing(4)
        }
    }
}))

function Layout({ children, className }) {
    const classes = useStyles()

    return (
        <div className={clsx(classes.container, className)}>
            <HueNoise/>

            <Container>
                <Header/>
            </Container>

            { children }
        </div>
    )
}

export default Layout