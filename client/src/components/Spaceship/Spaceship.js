import React, { useState, useEffect, useRef } from "react"
import { Fab } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ReloadIcon from "@material-ui/icons/Replay"

import sprite from "../../assets/images/spaceship.png"
import Game from "./Game/Game.js"
import ControlsDialog from "./ControlsDialog.js"
import Explosion from "./Explosion.js"
import { colliding } from "../../utils"

const SCROLL_OFFSET = 500

const useStyles = makeStyles(theme => ({
    spaceship: {
        width: 32,
        position: "absolute",
        top: 0, left: 0,
        zIndex: 2000,

        "& img": {
            width: "100%"
        }
    },

    bullet: {
        width: 2,
        height: 20,
        backgroundColor: "red",
        position: "absolute",
        top: 8, left: 8,
        zIndex: 1000
    },

    fab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4),
        zIndex: 500
    },

    fabIcon: {
        marginRight: theme.spacing(1)
    }
}))

function Spaceship() {
    const classes = useStyles()

    const containerRef = useRef()
    const spriteRef = useRef()

    const [isControlsDialogOpen, setIsControlsDialogOpen] = useState(true)

    useEffect(() => {
        if (isControlsDialogOpen) {
            return
        }

        const activeBullets = new Set()

        const game = new Game({
            // Handle player movement
            onPlayerChange: player => {
                document.documentElement.scrollTop = player.position.value[1] - window.innerHeight + SCROLL_OFFSET

                try {
                    spriteRef.current.style.transform = `
                        translate(${player.position.value[0]}px, ${player.position.value[1]}px)
                        rotate(${player.velocity.getAngle() + Math.PI}rad)
                    `
                } catch { }
            },

            // Handle bullet movement
            onBulletChange: bullet => {
                if (!activeBullets.has(bullet.id)) {
                    const element = document.createElement("div")

                    element.classList.add(classes.bullet)
                    element.id = bullet.id

                    containerRef.current.appendChild(element)

                    activeBullets.add(bullet.id)
                }

                // Detect collisions
                const elements = document.querySelectorAll("[data-shootable]:not([data-destroyed])")
                for (let element of elements) {
                    const elementRect = element.getBoundingClientRect()
                    elementRect.y += document.documentElement.scrollTop

                    const bulletRect = {
                        x: bullet.position.value[0],
                        y: bullet.position.value[1],
                        width: bullet.dimensions[0],
                        height: bullet.dimensions[1]
                    }

                    if (colliding(bulletRect, elementRect)) {
                        Explosion.explode(element)
                        bullet.destroy()
                        break
                    }
                }

                try {
                    document.getElementById(bullet.id).style.transform = `
                        translate(${bullet.position.value[0]}px, ${bullet.position.value[1]}px)
                        rotate(${bullet.velocity.getAngle() + Math.PI}rad)
                    `
                } catch { }
            },

            // Handle bullet removal
            onBulletRemove: bullet => {
                activeBullets.delete(bullet.id)
                const domElement = document.getElementById(bullet.id)

                if (domElement) {
                    containerRef.current.removeChild(domElement)
                }
            }
        })

        game.start()

        return game.destroy.bind(game)

        // eslint-disable-next-line
    }, [isControlsDialogOpen])

    return (
        <>
            <div ref={containerRef} style={{ display: isControlsDialogOpen && "none" }}>
                <div className={classes.spaceship} ref={spriteRef}>
                    <img src={sprite} alt="Spaceship" />
                </div>
            </div>

            <Fab variant="extended" color="secondary" className={classes.fab} onClick={() => window.location.reload()}>
                <ReloadIcon className={classes.fabIcon}/>
                Reload Page
            </Fab>

            <ControlsDialog
                open={isControlsDialogOpen}
                onClose={() => setIsControlsDialogOpen(false)}
            />
        </>
    )
}

export default Spaceship