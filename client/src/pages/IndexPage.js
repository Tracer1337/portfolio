import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Hero from "../components/Hero/Hero.js"
import Projects from "../components/Projects/Projects.js"

const useStyles = makeStyles(theme => ({
    section: {
        marginBottom: 200
    }
}))

function IndexPage() {
    const classes = useStyles()
    
    return (
        <Layout>
            <div className={classes.section}>
                <Hero/>
            </div>

            <div className={classes.section}>
                <Projects/>
            </div>
        </Layout>
    )
}

export default IndexPage