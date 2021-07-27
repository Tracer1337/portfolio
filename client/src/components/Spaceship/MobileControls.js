import React, { useRef, useImperativeHandle, useEffect } from "react"
import { Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import ShootButton from "./ShootButton.js"
import Joystick from "./Joystick.js"

const useStyles = makeStyles(theme => ({
    mobileControls: {
        position: "fixed",
        bottom: theme.spacing(0),
        left: theme.spacing(0),
        padding: theme.spacing(1),
        zIndex: 500,
        width: "100%"
    },

    joystickContainer: {
        minWidth: 200
    }
}))

function MobileControls(props, ref) {
    const classes = useStyles()

    const eventTargetRef = useRef(new EventTarget())

    useImperativeHandle(ref, () => ({
        eventTarget: eventTargetRef.current
    }))

    useEffect(() => {
        const preventDefault = event => event.preventDefault()

        window.addEventListener("touchmove", preventDefault, { passive: false })

        return () => {
            window.removeEventListener("touchmove", preventDefault, { passive: false })
        }
    })

    return (
        <div className={classes.mobileControls}>
            <Grid container wrap="nowrap">
                <Grid item container justify="center" alignItems="center">
                    <ShootButton eventTarget={eventTargetRef.current}/>
                </Grid>

                <Grid item container justify="flex-end" className={classes.joystickContainer}>
                    <Joystick eventTarget={eventTargetRef.current}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default React.forwardRef(MobileControls)