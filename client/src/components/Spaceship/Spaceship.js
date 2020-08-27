import React, { useEffect, useRef } from "react"
import { makeStyles } from "@material-ui/core/styles"

import sprite from "../../assets/images/spaceship.png"
import Game from "./Game/Game.js"

const useStyles = makeStyles(theme => ({
    spaceship: {
        width: 32,

        "& img": {
            width: "100%"
        }
    }
}))

function Spaceship() {
    const classes = useStyles()

    const spriteRef = useRef()

    useEffect(() => {
        const game = new Game()

        game.setOnPlayerChange(player => {
            spriteRef.current.style.transform = `
                translate(${player.position.value[0]}px, ${player.position.value[1]}px)
                rotate(${player.velocity.getAngle() + Math.PI}rad)
            `
        })

        game.start()

        return game.destroy
    }, [])

    return (
        <div className={classes.spaceship} ref={spriteRef}>
            <img src={sprite} alt="Spaceship"/>
        </div>
    )
}

export default Spaceship