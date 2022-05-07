/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import Spaceship from "./Spaceship"
import SpaceshipSelector from "./SpaceshipSelector"
import StartButton from "./StartButton"
import Controls from "./Controls"
import { Sprite, sprites } from "./sprites"
import { useAppContext } from "../../lib/context"

type Stage = "closed" | "selection" | "controls" | "gameplay"

function ShooterGame() {
    const context = useAppContext()

    const [stage, setStage] = useState<Stage>("closed")
    const [sprite, setSprite] = useState<Sprite>()

    useEffect(() => {
        context.set({ isGameRunning: !!sprite })
    }, [sprite])

    return (
        <>
            {stage === "closed" && (
                <StartButton onClick={(event) => {
                    setStage("selection")
                    event.currentTarget.blur()
                }}/>
            )}
            {stage === "selection" && (
                <SpaceshipSelector onSelect={(selection) => {
                    setSprite(sprites[selection])
                    setStage("controls")
                }}/>
            )}
            {stage === "controls" && (
                <Controls/>
            )}
            {stage === "gameplay" && sprite && (
                <Spaceship sprite={sprite}/>
            )}
        </>
    )
}

export default ShooterGame
