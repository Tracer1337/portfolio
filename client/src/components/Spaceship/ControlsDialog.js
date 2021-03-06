import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Grid, Paper } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ArrowUpIcon from "@material-ui/icons/ArrowUpward"
import ArrowLeftIcon from "@material-ui/icons/ArrowBack"
import ArrowRightIcon from "@material-ui/icons/ArrowForward"
import SpaceBarIcon from "@material-ui/icons/SpaceBar"

import Joystick from "./Joystick.js"
import ShootButton from "./ShootButton.js"
import { IS_MOBILE } from "../../config/constants.js"

const useStyles = makeStyles(theme => ({
    content: {
        paddingTop: theme.spacing(2.5)
    },

    arrowKey: {
        padding: theme.spacing(1),
        display: "flex"
    },

    arrowKeyPlaceholder: {
        minWidth: 40,
        maxWidth: 40
    },

    shootButtonWrapper: {
        height: 80
    },
    
    spaceBar: {
        height: 40,
        width: "100%"
    },

    spaceBarIcon: {
        width: "100%",
        height: "100%"
    },

    label: {
        textAlign: "center",
        marginTop: theme.spacing(2)
    },

    mobileContainer: {
        position: "relative"
    } 
}))

function ControlsDialog(props) {
    const classes = useStyles()

    return (
        <Dialog maxWidth="xs" disableBackdropClick {...props}>
            <DialogTitle>Controls</DialogTitle>

            <DialogContent dividers className={classes.content}>
                <Grid container spacing={2} direction={IS_MOBILE ? "row-reverse" : "row"}>
                    <Grid container item xs={6}>
                        { IS_MOBILE ? (
                            <Grid item xs={12}>
                                <Joystick/>
                            </Grid>
                        ) : (
                            <>
                                <Grid item xs={12} container justify="center">
                                    <Paper className={classes.arrowKey}>
                                        <ArrowUpIcon />
                                    </Paper>
                                </Grid>

                                <Grid container wrap="nowrap">
                                    <Grid item xs container justify="flex-end">
                                        <Paper className={classes.arrowKey}>
                                            <ArrowLeftIcon />
                                        </Paper>
                                    </Grid>

                                    <Grid item xs className={classes.arrowKeyPlaceholder} />

                                    <Grid item xs container justify="flex-start">
                                        <Paper className={classes.arrowKey}>
                                            <ArrowRightIcon />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </>
                        ) }

                        <Grid item xs={12}>
                            <Typography variant="h6" className={classes.label}>Movement</Typography>
                        </Grid>
                    </Grid>

                    <Grid container item xs={6}>
                        <Grid item xs={12} container alignItems="flex-end" justify="center" className={classes.shootButtonWrapper}>
                            { IS_MOBILE ? (
                                <ShootButton/>
                            ) : (
                                <Paper className={classes.spaceBar}>
                                    <SpaceBarIcon className={classes.spaceBarIcon}/>
                                </Paper>
                            ) }
                        </Grid>

                        <Grid item xs={12} container alignItems="flex-end" justify="center">
                            <Typography variant="h6" className={classes.label}>Shoot</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions>
                <Button onClick={props.onClose}>Okay</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ControlsDialog