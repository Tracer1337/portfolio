import React from "react"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    primary: {
        marginBottom: theme.spacing(2)
    },

    secondary: {
        fontWeight: 200
    }
}))

function Text() {
    const classes = useStyles()

    return (
        <div>
            <Typography variant="h3" className={classes.primary}>Merlin Moelter</Typography>
            <Typography variant="h3" className={classes.secondary}>Programming with passion</Typography>
        </div>
    )
}

export default Text