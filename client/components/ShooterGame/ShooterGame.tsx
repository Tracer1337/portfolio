/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import Spaceship from "./Spaceship"
import SpaceshipSelector from "./SpaceshipSelector"
import StartButton from "./StartButton"
import ControlsModal from "./ControlsModal"
import { spaceships, Spaceship as SpaceshipType } from "./spaceships"
import { useAppContext } from "../../lib/context"

enum Stage {
    CLOSED,
    SELECTION,
    CONTROLS,
    GAMEPLAY
}

function ShooterGame() {
    const context = useAppContext()

    const [stage, setStage] = useState<Stage>(Stage.CLOSED)
    const [spaceship, setSpaceship] = useState<SpaceshipType>()

    useEffect(() => {
        context.set({ isGameRunning: !!spaceship })
    }, [spaceship])

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
                    setSpaceship(spaceships[selection])
                    setStage(Stage.GAMEPLAY)
                }}/>
            )}
            {stage === Stage.CONTROLS && (
                <ControlsModal onClose={() => setStage(Stage.GAMEPLAY)}/>
            )}
            {stage === Stage.GAMEPLAY && spaceship && (
                <Spaceship spaceship={spaceship}/>
            )}
        </>
    )
}

export default ShooterGame
