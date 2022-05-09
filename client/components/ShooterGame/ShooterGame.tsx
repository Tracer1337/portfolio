/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import SpaceshipSelector from "./SpaceshipSelector"
import StartButton from "./StartButton"
import ControlsModal from "./ControlsModal"
import { spaceships, Spaceship as SpaceshipType } from "./utils/spaceships"
import { useAppContext } from "@lib/context"
import Gameplay from "./Gameplay"

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
    const [score, setScore] = useState<number>()

    useEffect(() => {
        context.set({ isGameRunning: stage === Stage.GAMEPLAY })
    }, [stage])

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
                    setStage(Stage.CONTROLS)
                }}/>
            )}

            {stage === Stage.CONTROLS && (
                <ControlsModal onClose={() => setStage(Stage.GAMEPLAY)}/>
            )}

            {stage === Stage.GAMEPLAY && spaceship && (
                <Gameplay
                    spaceship={spaceship}
                    onDone={(score) => {
                        console.log({ score })
                        setScore(score)
                        setStage(Stage.CLOSED)
                    }}
                />
            )}
        </>
    )
}

export default ShooterGame
