import React, { useState, useEffect, useMemo } from "react"
import { Grid } from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles } from "@material-ui/core/styles"

import Item from "./Item.js"
import { getImageDimensions, getAmountOfRows } from "../../utils"

class Row {
    constructor() {
        this.elements = []
        this.score = 0
    }
}

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(2)
    },

    image: {
        width: "100%"
    }
}))

function ImageGrid({ images, isLoading }) {
    const classes = useStyles()

    const [amountOfRows, setAmountOfRows] = useState(getAmountOfRows())
    const [rows, setRows] = useState([])

    const skeletons = useMemo(() => (
        Array(amountOfRows).fill(0).map((_, i) => (
            <Grid item xs={12 / amountOfRows} key={i}>
                {Array(2).fill(0).map((_, j) => (
                    <Skeleton
                        variant="rect"
                        height={Math.floor(Math.random() * 100) + 100}
                        className={classes.card}
                        key={j}
                    />
                ))}
            </Grid>
        ))
    ), [amountOfRows, classes.card])

    // Arrange images
    useEffect(() => {
        (async () => {
            // Create array of amountOfRows Row objects
            const newRows = Array(amountOfRows).fill(0).map(() => new Row())

            // Insert all images into grid
            for (let src of images) {
                // Get image dimensions
                const { width, height } = await getImageDimensions(src)

                // Get width-to-height ratio
                const ratio = height / width

                // Get row with lowest score
                let row = newRows[0]

                newRows.forEach(_row => {
                    if (row.score > _row.score) {
                        row = _row
                    }
                })

                // Add item to row's elements
                row.elements.push( <Item src={src} key={src} /> )

                // Add element's score to row
                row.score += ratio
            }

            setRows(newRows)
        })()
    }, [amountOfRows, images])

    useEffect(() => {
        const handleResize = () => {
            const newAmountOfRows = getAmountOfRows()

            if (amountOfRows !== newAmountOfRows) {
                setAmountOfRows(newAmountOfRows)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    })

    if (isLoading) {
        return (
            <Grid container spacing={2}>
                { skeletons }
            </Grid>
        )
    }

    return (
        <Grid container spacing={2}>
            {rows.map((row, i) => (
                <Grid item xs={12 / amountOfRows} key={i}>
                    { row.elements }
                </Grid>
            ))}
        </Grid>
    )
}

export default ImageGrid