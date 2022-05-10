/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import SpaceshipSelector from "./SpaceshipSelector"
import StartButton from "./StartButton"
import ControlsModal from "./ControlsModal"
import Gameplay from "./Gameplay"
import SubmitScoreModal from "./SubmitScoreModal"
import Leaderboard from "./Leaderboard"
import { spaceships, Spaceship as SpaceshipType } from "./utils/spaceships"
import { useAppContext } from "@lib/context"

enum Stage {
    CLOSED,
    SELECTION,
    CONTROLS,
    GAMEPLAY,
    SUBMIT,
    LEADERBOARD
}

function ShooterGame() {
    const context = useAppContext()

    const [stage, setStage] = useState<Stage>(Stage.SUBMIT)
    const [spaceship, setSpaceship] = useState<SpaceshipType>(spaceships[0])
    const [score, setScore] = useState<number>(100)

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
                        setScore(score)
                        setStage(Stage.SUBMIT)
                    }}
                />
            )}

            {stage === Stage.SUBMIT && spaceship && (
                <SubmitScoreModal
                    score={score || 0}
                    spaceship={spaceship}
                    onClose={() => setStage(Stage.LEADERBOARD)}
                />
            )}

            {stage === Stage.LEADERBOARD && (
                <Leaderboard onClose={() => setStage(Stage.CLOSED)}/>
            )}
        </>
    )
}

export default ShooterGame
