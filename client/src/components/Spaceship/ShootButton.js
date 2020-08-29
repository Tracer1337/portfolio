import React from "react"
import { Fab } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import shooticon from "../../assets/images/shoot-icon.jpg"

const useStyles = makeStyles(theme => ({
    shootButton: {
        padding: theme.spacing(1),
        boxShadow: theme.shadows[3]
    },

    icon: {
        width: "80%"
    }
}))

function ShootButton({ eventTarget }) {
    const classes = useStyles()

    const dispatch = (type) => eventTarget.dispatchEvent(new CustomEvent(type))

    const handleStart = () => {
        dispatch("shootStart")
    }

    const handleEnd = () => {
        dispatch("shootEnd")
    }

    return (
        <Fab
            onTouchStart={handleStart}
            onTouchEnd={handleEnd}
            onTouchCancel={handleEnd}
            className={classes.shootButton}
            color="inherit"
        >
            <img src={shooticon} alt="Shoot" className={classes.icon}/>
        </Fab>
    )
}

export default ShootButton