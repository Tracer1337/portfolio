/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import Spaceship from "./Spaceship"
import SpaceshipSelector from "./SpaceshipSelector"
import StartButton from "./StartButton"
import ControlsModal from "./ControlsModal"
import { Sprite, sprites } from "./sprites"
import { useAppContext } from "../../lib/context"

enum Stage {
    CLOSED,
    SELECTION,
    CONTROLS,
    GAMEPLAY
}

function ShooterGame() {
    const context = useAppContext()

    const [stage, setStage] = useState<Stage>(Stage.SELECTION)
    const [sprite, setSprite] = useState<Sprite>()

    useEffect(() => {
        context.set({ isGameRunning: !!sprite })
    }, [sprite])

    return (
        <>
            {stage === Stage.CLOSED && (
                <StartButton onClick={(event) => {
                    setStage(Stage.SELECTION)
                    event.currentTarget.blur()
                }}/>
            )}
            {stage === Stage.SELECTION && (
                <SpaceshipSelector onSelect={(selection) => {
                    setSprite(sprites[selection])
                    setStage(Stage.GAMEPLAY)
                }}/>
            )}
            {stage === Stage.CONTROLS && (
                <ControlsModal onClose={() => setStage(Stage.GAMEPLAY)}/>
            )}
            {stage === Stage.GAMEPLAY && sprite && (
                <Spaceship sprite={sprite}/>
            )}
        </>
    )
}

export default ShooterGame
