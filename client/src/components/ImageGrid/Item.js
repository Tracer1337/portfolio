import React, { useState, useEffect, useRef, useReducer } from "react"
import { Card, CardActionArea, Dialog, DialogContent } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import { getDialogImageDimensions } from "../../utils"

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(2)
    },

    image: {
        width: "100%"
    },

    dialog: {
        alignItems: "center",
        justifyContent: "center"
    },

    dialogImage: {
        // width: "auto",
        // height: "auto",
        maxWidth: "100%",
        maxHeight: "100%"
    }
}))

function Item({ src }) {
    const classes = useStyles()

    const cardRef = useRef()
    const imageRef = useRef()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogImageDimensions, setDialogImageDimensions] = useState({})
    const [reloadKey, forceReload] = useReducer(key => key + 1, 0)

    useEffect(() => {
        const resize = async () => {
            cardRef.current.style.height = imageRef.current.clientHeight + "px"

            setDialogImageDimensions(await getDialogImageDimensions(src))
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
                classes={{ paper: classes.dialog }}
            >
                <DialogContent>
                    <img src={src} alt="" className={classes.dialogImage}/>
                </DialogContent>
            </Dialog>
        </Card>
    )
}

export default Item