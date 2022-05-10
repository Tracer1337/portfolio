/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react"
import SpaceshipSelector from "./SpaceshipSelector"
import ControlsModal from "./ControlsModal"
import Gameplay from "./Gameplay"
import SubmitScoreModal from "./SubmitScoreModal"
import Leaderboard from "./Leaderboard"
import { spaceships, Spaceship as SpaceshipType } from "./utils/spaceships"
import { useAppContext } from "@lib/context"

enum Stage {
    SELECTION,
    CONTROLS,
    GAMEPLAY,
    SUBMIT,
    LEADERBOARD
}

function ShooterGame({ onClose }: { onClose: () => void }) {
    const context = useAppContext()

    const [stage, setStage] = useState<Stage>(Stage.SELECTION)
    const [spaceship, setSpaceship] = useState<SpaceshipType>()
    const [score, setScore] = useState<number>()

    useEffect(() => {
        context.set({ isGameRunning: stage === Stage.GAMEPLAY })
    }, [stage])

    return (
        <>
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
                <Leaderboard onClose={onClose}/>
            )}
        </>
    )
}

export default ShooterGame
