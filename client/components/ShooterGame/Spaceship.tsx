/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { Spaceship as SpaceshipType } from "./spaceships"
import { usePlayerControls } from "./player"

function Spaceship({ spaceship }: { spaceship: SpaceshipType }) {
    const spriteRef = useRef<HTMLImageElement>(null)

    usePlayerControls({ spriteRef })

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
