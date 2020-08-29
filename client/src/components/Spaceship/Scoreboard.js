import React, { useRef, useImperativeHandle } from "react"
import { Paper, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    scoreboard: {
        position: "fixed",
        top: theme.spacing(4),
        right: theme.spacing(4),
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        zIndex: 500
    }
}))

function Scoreboard(props, ref) {
    const classes = useStyles()

    const outputRef = useRef()
    const pointsRef = useRef(0)

    useImperativeHandle(ref, () => ({
        addPoints: points => {
            pointsRef.current += points
            outputRef.current.textContent = pointsRef.current
        }
    }))

    return (
        <Paper className={classes.scoreboard}>
            <Typography variant="h6" align="center">Score: <span ref={outputRef}>0</span></Typography>
        </Paper>
    )
}

export default React.forwardRef(Scoreboard)