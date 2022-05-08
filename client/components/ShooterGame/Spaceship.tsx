/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { Spaceship as SpaceshipType } from "./spaceships"
import { useBulletManager } from "./bullet"
import { usePlayerControls } from "./player"
import { useGameLoop } from "./game"

function Spaceship({ spaceship }: { spaceship: SpaceshipType }) {
    const spriteRef = useRef<HTMLImageElement>(null)

    const bulletManager = useBulletManager({
        spaceship,
        spriteRef
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
