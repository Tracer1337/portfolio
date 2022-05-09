/** @jsxImportSource @emotion/react */
import { useRef } from "react"
import { css } from "@emotion/react"
import Spaceship, { SpaceshipRef } from "./Spaceship"
import Scoreboard, { ScoreboardRef } from "./Scoreboard"
import Timer from "./Timer"
import { Spaceship as SpaceshipType } from "./utils/spaceships"

function Gameplay({ spaceship, onDone }: {
    spaceship: SpaceshipType,
    onDone: (score: number) => void
}) {
    const spaceshipRef = useRef<SpaceshipRef>(null)
    const scoreboardRef = useRef<ScoreboardRef>(null)

    return (
        <>
            <div css={css`
                position: fixed;
                top: 32px;
                width: 100vw;
                display: flex;
                justify-content: center;
            `}>
                <Scoreboard ref={scoreboardRef}/>
                <Timer
                    duration={3}
                    onDone={() => onDone(
                        spaceshipRef.current?.getScore() || 0
                    )}
                />
            </div>
            <Spaceship
                ref={spaceshipRef}
                spaceship={spaceship}
                scoreboardRef={scoreboardRef}
            />
        </>
    )
}

export default Gameplay
