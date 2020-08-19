import React, { useState, useEffect, useRef, useReducer } from "react"
import { Card, CardActionArea, Dialog, DialogContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(2)
    },

    image: {
        width: "100%"
    },

    dialog: {
        alignItems: "center",
        justifyContent: "center",
        maxHeight: "unset",
        height: `calc(100% - ${theme.spacing(8)}px)`,
        background: "none",
        boxShadow: "none"
    },

    innerDialog: {
        height: "100%",
        padding: "0 !important",
        overflow: "hidden"
    },

    dialogImage: {
        maxWidth: "100%",
        maxHeight: "100%",
        width: "auto",
        height: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}))

function Item({ src }) {
    const classes = useStyles()

    const cardRef = useRef()
    const imageRef = useRef()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [reloadKey, forceReload] = useReducer(key => key + 1, 0)

    const handleDialogClick = (event) => {
        if (event.target.tagName === "DIV") {
            setIsDialogOpen(false)
        }
    }

    useEffect(() => {
        const resize = () => {
            cardRef.current.style.height = imageRef.current.clientHeight + "px"
        }

        resize()

        window.addEventListener("resize", resize)

        return () => {
            window.removeEventListener("resize", resize)
        }
    }, [cardRef, imageRef, reloadKey])

    return (
        <Card className={classes.card} innerRef={cardRef}>
            <CardActionArea onClick={() => setIsDialogOpen(true)}>
                <img src={src} alt="" className={classes.image} ref={imageRef} onLoad={forceReload} />
            </CardActionArea>

            <Dialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    onClick: handleDialogClick,
                    className: classes.dialog
                }}
            >
                <DialogContent classes={{ root: classes.innerDialog }}>
                    <img src={src} alt="" className={classes.dialogImage}/>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default Item