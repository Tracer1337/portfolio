import React from "react"
import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

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
            <Header {...HeaderProps}/>

            { children }
        </Container>
    )
}

export default Layout