/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react"
import SpaceshipSelector from "./SpaceshipSelector"
import Spaceship from "./Spaceship"
import Scoreboard, { ScoreboardRef } from "./Scoreboard"
import StartButton from "./StartButton"
import ControlsModal from "./ControlsModal"
import { spaceships, Spaceship as SpaceshipType } from "./utils/spaceships"
import { useAppContext } from "@lib/context"

enum Stage {
    CLOSED,
    SELECTION,
    CONTROLS,
    GAMEPLAY
}

function ShooterGame() {
    const context = useAppContext()

    const scoreboardRef = useRef<ScoreboardRef>(null)

    const [stage, setStage] = useState<Stage>(Stage.CLOSED)
    const [spaceship, setSpaceship] = useState<SpaceshipType>()

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
                <>
                    <Spaceship
                        spaceship={spaceship}
                        scoreboardRef={scoreboardRef}
                    />
                    <Scoreboard ref={scoreboardRef}/>
                </>
            )}
        </>
    )
}

export default ShooterGame
