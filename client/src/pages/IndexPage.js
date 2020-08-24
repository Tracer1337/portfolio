import React from "react"
import { Helmet } from "react-helmet"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Container from "../components/Layout/Container.js"
import Hero from "../components/Hero/Hero.js"
import Projects from "../components/Projects/Projects.js"
import AboutMe from "../components/AboutMe.js"
import { makeTitle } from "../utils"

const useStyles = makeStyles(theme => ({
    section: {
        marginBottom: 100
    },

    layout: {
        marginBottom: 150
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
        <Layout className={classes.layout}>
            <Helmet>
                <title>{ makeTitle("Index") }</title>
            </Helmet>

            <Container className={classes.section}>
                <Hero/>
            </Container>

            <div className={classes.section} id="projects">
                <Projects/>
            </div>

            <Container className={classes.section} id="about-me">
                <AboutMe/>
            </Container>
        </Layout>
    )
}

export default IndexPage