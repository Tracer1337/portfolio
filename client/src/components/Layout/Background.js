import React, { useRef, useEffect, useState } from "react"
import { Slider } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import PerlinNoise from "../../lib/perlin-noise.js"

import { hslToRgb } from "../../utils"

const useStyles = makeStyles(theme => ({
    container: {
        zIndex: -1,
        position: "absolute",
        top: "-56%",
        left: 0,
        height: "100vh",
        width: "100vw"
    },

    canvas: {
        width: "100vw",
        height: "100vh",
        transform: "skewY(-15deg)"
    }
}))

const showSlider = false

const CANVAS_SIZE = .25
const NOISE_SCALE = 200
const HUE_OFFSET = .3
const HUE_FACTOR = 1
const SATURATION = 1
const LIGHTNESS = .7
let SPEED = .55
SPEED /= 1e4

function Background() {
    const classes = useStyles()

    const canvasRef = useRef()
    
    const [sliderValue, setSliderValue] = useState(0)

    const handleSliderChange = (event, newValue) => {
        console.log(newValue / 100)
        setSliderValue(newValue)
    }

    useEffect(() => {
        const canvas = canvasRef.current

        // Set canvas dimensions
        const width = canvas.width = Math.floor(window.innerWidth * CANVAS_SIZE)
        const height = canvas.height = Math.floor(window.innerHeight * CANVAS_SIZE)
        
        const ctx = canvas.getContext("2d")

        // Create new image
        const image = ctx.createImageData(width, height)

        // Fill image with noise
        const generator = new PerlinNoise()
        let z = 0, lastTime = performance.now()

        function update() {
            const currentTime = performance.now()
            const deltaTime = currentTime - lastTime
            lastTime = currentTime

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    // Calculate current cell index in image
                    const cell = (y * width + x) * 4

                    // Generate noise value
                    let value = generator.noise(x / NOISE_SCALE, y / NOISE_SCALE, z)

                    // Map value from -1 - 1 to 0 - 1
                    value = (1 + value) / 2

                    // Convert hue to rgb values
                    const hue = (value + HUE_OFFSET) * HUE_FACTOR % 1
                    const [r, g, b] = hslToRgb(hue, SATURATION, LIGHTNESS)

                    // Set image pixel color at cell to rgb
                    image.data[cell] = r
                    image.data[cell + 1] = g
                    image.data[cell + 2] = b
                    image.data[cell + 3] = 255 // Alpha channel
                }
            }

            // Paint image onto canvas
            ctx.putImageData(image, 0, 0)

            z += deltaTime * SPEED

            requestAnimationFrame(update)
        }

        update()
    }, [])

    return (
        <>
            { showSlider && <Slider value={sliderValue} onChange={handleSliderChange} /> }
            <div className={classes.container}>
                <canvas ref={canvasRef} className={classes.canvas}/>
            </div>
        </>
    )
}

export default Background