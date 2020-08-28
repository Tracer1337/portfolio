import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core"

function ControlsDialog(props) {
    return (
        <Dialog {...props}>
            <DialogTitle>Controls</DialogTitle>

            <DialogContent>
                <Typography paragraph>Arrow Keys: Move</Typography>
                <Typography paragraph>Space: Shoot</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={props.onClose}>Okay</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ControlsDialog