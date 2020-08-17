import React from "react"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"
import Hero from "../components/Hero/Hero.js"

const useStyles = makeStyles(theme => ({
    
}))

function IndexPage() {
    const classes = useStyles()
    
    return (
        <Layout>
            <Hero/>
        </Layout>
    )
}

export default IndexPage