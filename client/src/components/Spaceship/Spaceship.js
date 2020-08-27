import React, { useState, useEffect, useRef } from "react"
import { Fab } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ReloadIcon from "@material-ui/icons/Replay"

import sprite from "../../assets/images/spaceship.png"
import explosion from "../../assets/images/explosion.gif"
import Game from "./Game/Game.js"
import ControlsDialog from "./ControlsDialog.js"

const SCROLL_OFFSET = 500
const EXPLOSION_MIN_HEIGHT = 50

function colliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    )
}

async function destroy(element) {
    element.setAttribute("data-destroyed", true)
    element.style.visibility = "hidden"

    const rect = element.getBoundingClientRect()
    rect.y += document.documentElement.scrollTop

    /**
     * Build container
     */
    const container = document.createElement("div")

    container.style.height = Math.max(EXPLOSION_MIN_HEIGHT, rect.height) + "px"
    container.style.width = rect.width + "px"
    container.style.display = "flex"
    container.style.justifyContent = "center"
    container.style.position = "absolute"
    container.style.top = "0"
    container.style.transform = `translate(${rect.x}px, ${rect.y}px)`

    /**
     * Build animation
     */
    const animation = document.createElement("img")

    animation.src = explosion

    animation.style.height = "100%"

    container.appendChild(animation)

    document.body.appendChild(container)

    setTimeout(() => {
        document.body.removeChild(container)
    }, 800)
}

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

        const game = new Game()

        const activeBullets = new Set()

        // Handle player movement
        game.setOnPlayerChange(player => {
            document.documentElement.scrollTop = player.position.value[1] - window.innerHeight + SCROLL_OFFSET

            try {
                spriteRef.current.style.transform = `
                    translate(${player.position.value[0]}px, ${player.position.value[1]}px)
                    rotate(${player.velocity.getAngle() + Math.PI}rad)
                `
            } catch {}
        })

        // Handle bullet movement
        game.setOnBulletChange(bullet => {
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
                    destroy(element)
                    bullet.destroy()
                    break
                }
            }

            try {
                document.getElementById(bullet.id).style.transform = `
                    translate(${bullet.position.value[0]}px, ${bullet.position.value[1]}px)
                    rotate(${bullet.velocity.getAngle() + Math.PI}rad)
                `
            } catch {}
        })

        // Handle bullet removal
        game.setOnBulletRemove(bullet => {
            activeBullets.delete(bullet.id)
            containerRef.current.removeChild(document.getElementById(bullet.id))
        })

        game.start()

        return () => game.destroy()
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