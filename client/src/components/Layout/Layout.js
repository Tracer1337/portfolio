import React from "react"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Background from "./Background.js"
import Header from "./Header.js"

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(8)
    }
}))

function Layout({ children, HeaderProps }) {
    const classes = useStyles()

    return (
        <Container className={classes.container}>
            <Background/>

            <Header {...HeaderProps}/>

            { children }
        </Container>
    )
}

export default Layout