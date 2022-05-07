/** @jsxImportSource @emotion/react */
import { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import { Sprite } from "./sprites"
import { useGame } from "./game"

function Spaceship({ sprite }: { sprite: Sprite }) {
    const spriteRef = useRef<HTMLImageElement>(null)

    useGame({ spriteRef })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    
    return (
        <img
            ref={spriteRef}
            src={sprite.url}
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
