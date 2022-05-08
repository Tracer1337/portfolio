/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { Spaceship as SpaceshipType } from "./utils/spaceships"
import { useBulletManager } from "./utils/bullet"
import { usePlayerControls } from "./utils/player"
import { useGameLoop } from "./utils/game"
import { useTargetManager } from "./utils/target"

function Spaceship({ spaceship }: { spaceship: SpaceshipType }) {
    const spriteRef = useRef<HTMLImageElement>(null)

    const targetManager = useTargetManager()

    const bulletManager = useBulletManager({
        spaceship,
        spriteRef,
        targetManager
    })

    const playerControls = usePlayerControls({
        spriteRef,
        bulletManager
    })

    useGameLoop((args) => {
        playerControls?.update?.(args)
        bulletManager?.update?.(args)
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <img
            ref={spriteRef}
            src={spaceship.sprite.url}
            alt="Spaceship"
            css={css`
                position: absolute;
                top: 0;
                left: 0;
                max-width: 100px;
                max-height: 100px;
            `}
        />
    )
}

export default Spaceship
