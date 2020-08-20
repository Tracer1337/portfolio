import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Text from "./Text.js"
import Techstack from "../Techstack.js"
import useAPIData from "../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    container: {
        height: 740,
        display: "flex",
        alignItems: "center"
    },

    primary: {
        width: "50%"
    },

    secondary: {
        width: "50%",
        paddingLeft: theme.spacing(3)
    },

    techstackTitle: {
        // fontWeight: 200,
        textAlign: "center",
        marginBottom: theme.spacing(4)
    },

    [theme.breakpoints.down("md")]: {
        container: {
            flexDirection: "column"
        },
        
        primary: {
            width: "100%"
        }
    },

    [theme.breakpoints.down("sm")]: {
        secondary: {
            width: "100%",
            padding: 0
        }
    }
}))

function Hero() {
    const classes = useStyles()

    const { data, isLoading } = useAPIData("getTotalTechstack")

    return (
        <div className={classes.container}>
            <div className={classes.primary}>
                <Text/>
            </div>

            <div className={classes.secondary}>
                <Typography variant="h4" className={classes.techstackTitle}>My Techstack</Typography>
                <Techstack data={data} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default Hero