import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Header from "./Header.js"

const useStyles = makeStyles(theme => ({
    container: {
        maxWidth: 1220,
        margin: `${theme.spacing(8)}px auto 0 auto`
    }
}))

function Layout({ children }) {
    const classes = useStyles()

    return (
        <div className={classes.container}>
            <Header/>

            { children }
        </div>
    )
}

export default Layout