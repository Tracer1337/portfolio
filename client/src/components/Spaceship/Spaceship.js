import React, { useEffect, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles"

import sprite from "../../assets/images/spaceship.png"
import Game from "./Game/Game.js"

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

const SCROLL_THRESHOLD = 500

function Spaceship() {
    const classes = useStyles()

    const containerRef = useRef()
    const spriteRef = useRef()

    useEffect(() => {
        const game = new Game()

        const activeBullets = new Set()

        game.setOnPlayerChange(player => {
            if (player.position.value[1] > document.documentElement.scrollTop - window.innerHeight - SCROLL_THRESHOLD) {
                document.documentElement.scrollTop = player.position.value[1] - window.innerHeight + SCROLL_THRESHOLD
            }

            spriteRef.current.style.transform = `
                translate(${player.position.value[0]}px, ${player.position.value[1]}px)
                rotate(${player.velocity.getAngle() + Math.PI}rad)
            `
        })

        game.setOnBulletChange(bullet => {
            if (!activeBullets.has(bullet.id)) {
                const element = document.createElement("div")

                element.classList.add(classes.bullet)
                element.id = bullet.id

                containerRef.current.appendChild(element)

                activeBullets.add(bullet.id)
            }

            document.getElementById(bullet.id).style.transform = `
                translate(${bullet.position.value[0]}px, ${bullet.position.value[1]}px)
                rotate(${bullet.velocity.getAngle() + Math.PI}rad)
            `
        })

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