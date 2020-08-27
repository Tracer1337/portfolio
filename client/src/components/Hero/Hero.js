import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import TextContent from "./TextContent.js"
import Techstack from "../Techstack.js"
import useAPIData from "../../utils/useAPIData.js"

const useStyles = makeStyles(theme => ({
    hero: {
        height: 740,
        display: "flex",
        alignItems: "center"
    },

    primary: {
        width: "50%"
    },

    secondary: {
        width: "50%",
        paddingLeft: theme.spacing(3),
        position: "relative"
    },

    techstackTitle: {
        textAlign: "center",
        marginBottom: theme.spacing(4)
    },

    [theme.breakpoints.down("md")]: {
        hero: {
            flexDirection: "column",
            height: "unset"
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
        <div className={classes.hero}>
            <div className={classes.primary}>
                <TextContent/>
            </div>

            <div className={classes.secondary}>
                <Typography variant="h4" className={classes.techstackTitle} data-shootable>My Techstack</Typography>
                <Techstack data={data} isLoading={isLoading} />
            </div>
        </div>
    )
}

export default Hero