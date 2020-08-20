import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Hero from "../components/Hero/Hero.js"
import Projects from "../components/Projects/Projects.js"
import AboutMe from "../components/AboutMe.js"

const useStyles = makeStyles(theme => ({
    section: {
        marginBottom: 200
    },

    [theme.breakpoints.down("sm")]: {
        section: {
            marginBottom: theme.spacing(12)
        }
    }
}))

function IndexPage() {
    const classes = useStyles()
    
    return (
        <Layout>
            <div className={classes.section}>
                <Hero/>
            </div>

            <div className={classes.section} id="projects">
                <Projects/>
            </div>

            <div className={classes.section} id="about-me">
                <AboutMe/>
            </div>
        </Layout>
    )
}

export default IndexPage