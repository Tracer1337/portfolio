/** @jsxImportSource @emotion/react */
import React, { useCallback, useEffect, useRef } from "react"
import { css } from "@emotion/react"
import Spaceship from "./Spaceship"
import Scoreboard, { ScoreboardRef } from "./Scoreboard"
import Timer from "./Timer"
import { Spaceship as SpaceshipType } from "./utils/spaceships"
import { useScoreManager } from "./utils/score"
import { useRaycaster } from "./utils/raycaster"
import { useTargetManager } from "./utils/target"
import { useBulletManager } from "./utils/bullet"
import { usePlayerControls } from "./utils/player"
import { UpdateFunction, useGameLoop } from "./utils/game"

function Gameplay({ spaceship, onDone }: {
    spaceship: SpaceshipType,
    onDone: (score: number) => void
}) {
    const spriteRef = useRef<HTMLImageElement>(null)
    const scoreboardRef = useRef<ScoreboardRef>(null)
    const isRunning = useRef(true)

    const scoreManager = useScoreManager({
        scoreboardRef
    })

    const raycaster = useRaycaster()

    const targetManager = useTargetManager({
        scoreManager,
        raycaster
    })

    const bulletManager = useBulletManager({
        spaceship,
        spriteRef,
        targetManager,
        raycaster
    })

    const playerControls = usePlayerControls({
        spriteRef,
        bulletManager
    })

    const update = useCallback<UpdateFunction>((args) => {
        if (!isRunning.current) return
        playerControls?.update?.(args)
        bulletManager?.update?.(args)
        targetManager?.update?.(args)
    }, [playerControls, bulletManager])
    
    useGameLoop(update)

    const destroy = () => {
        isRunning.current = false
        targetManager?.destroy()
        bulletManager?.destroy()
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
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
                    duration={15}
                    onDone={() => {
                        const score = scoreManager?.getScore()
                        destroy()
                        onDone(score || 0)
                    }}
                />
            </div>
            <Spaceship ref={spriteRef} spaceship={spaceship}/>
        </>
    )
}

export default Gameplay
