import React from "react"
import { useParams } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"

import Layout from "../components/Layout/Layout.js"

const useStyles = makeStyles(theme => ({

}))

function ProjectPage() {
    const { id } = useParams()

    const classes = useStyles()

    return (
        <Layout>
            <div>
                Project ID: { id }
            </div>
        </Layout>
    )
}

export default ProjectPage