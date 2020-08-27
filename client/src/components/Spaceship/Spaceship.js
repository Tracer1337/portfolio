import React, { useEffect, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles"

import sprite from "../../assets/images/spaceship.png"
import explosion from "../../assets/images/explosion.gif"
import Game from "./Game/Game.js"

function colliding(rect1, rect2) {
    return (
        rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.y + rect1.height > rect2.y
    )
}

function destroy(element) {
    element.setAttribute("data-destroyed", true)
    element.style.visibility = "hidden"

    const rect = element.getBoundingClientRect()

    const animation = document.createElement("img")

    animation.src = explosion

    animation.style.height = rect.height + "px"
    animation.style.transform = `translate(${rect.x}px, ${rect.y}px)`
    animation.style.position = "absolute"
    animation.style.top = "0"

    document.body.appendChild(animation)

    setTimeout(() => {
        document.body.removeChild(animation)
    }, 800)
}

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
    }
}))

function Spaceship() {
    const classes = useStyles()

    const containerRef = useRef()
    const spriteRef = useRef()

    useEffect(() => {
        const game = new Game()

        const activeBullets = new Set()

        // Handle player movement
        game.setOnPlayerChange(player => {
            document.documentElement.scrollTop = player.position.value[1] - window.innerHeight + SCROLL_OFFSET

            spriteRef.current.style.transform = `
                translate(${player.position.value[0]}px, ${player.position.value[1]}px)
                rotate(${player.velocity.getAngle() + Math.PI}rad)
            `
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

                const bulletRect = {
                    x: bullet.position.value[0],
                    y: bullet.position.value[1],
                    width: bullet.dimensions[0],
                    height: bullet.dimensions[1]
                }

                if (colliding(bulletRect, elementRect)) {
                    destroy(element)
                    bullet.destroy()
                }
            }

            const element = document.getElementById(bullet.id)

            if (element) {
                element.style.transform = `
                    translate(${bullet.position.value[0]}px, ${bullet.position.value[1]}px)
                    rotate(${bullet.velocity.getAngle() + Math.PI}rad)
                `
            }
        })

        // Handle bullet removal
        game.setOnBulletRemove(bullet => {
            activeBullets.delete(bullet.id)
            containerRef.current.removeChild(document.getElementById(bullet.id))
        })

        game.start()

        return game.destroy
    }, [])

    return (
        <div ref={containerRef}>
            <div className={classes.spaceship} ref={spriteRef}>
                <img src={sprite} alt="Spaceship"/>
            </div>
        </div>
    )
}

export default Spaceship