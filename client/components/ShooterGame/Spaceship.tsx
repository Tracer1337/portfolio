/** @jsxImportSource @emotion/react */
import React, {
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef
} from "react"
import { css } from "@emotion/react"
import Image from "@components/Image"
import { ScoreboardRef } from "./Scoreboard"
import { Spaceship as SpaceshipType } from "./utils/spaceships"
import { useBulletManager } from "./utils/bullet"
import { usePlayerControls } from "./utils/player"
import { UpdateFunction, useGameLoop } from "./utils/game"
import { useTargetManager } from "./utils/target"
import { useScoreManager } from "./utils/score"

export type SpaceshipRef = {
    getScore: () => number,
    destroy: () => void
}

function Spaceship(
    { spaceship, scoreboardRef }: {
        spaceship: SpaceshipType,
        scoreboardRef: React.RefObject<ScoreboardRef>
    },
    ref: React.ForwardedRef<SpaceshipRef>
) {
    const spriteRef = useRef<HTMLImageElement>(null)
    const isRunning = useRef(true)

    const scoreManager = useScoreManager({
        scoreboardRef
    })

    const targetManager = useTargetManager({
        scoreManager
    })

    const bulletManager = useBulletManager({
        spaceship,
        spriteRef,
        targetManager
    })

    const playerControls = usePlayerControls({
        spriteRef,
        bulletManager
    })

    const update = useCallback<UpdateFunction>((args) => {
        if (!isRunning.current) return
        playerControls?.update?.(args)
        bulletManager?.update?.(args)
    }, [playerControls, bulletManager])
    
    useGameLoop(update)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useImperativeHandle(ref, () => ({
        getScore: () => scoreManager?.getScore() || 0,
        destroy: () => {
            isRunning.current = false
            targetManager?.destroy()
            bulletManager?.destroy()
        }
    }))
    
    return (
        <Image
            ref={spriteRef}
            src={spaceship.sprite.url}
            alt="Spaceship"
            layout="fill"
            objectFit="contain"
            css={css`
                width: 100px;
                height: 100px;
                position: absolute;
                top: 0;
                left: 0;
            `}
        />
    )
}

export default React.forwardRef(Spaceship)
