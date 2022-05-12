/** @jsxImportSource @emotion/react */
import React from "react"
import { css } from "@emotion/react"
import Image from "@components/Image"
import { Spaceship as SpaceshipType } from "./utils/spaceships"

function Spaceship(
    { spaceship }: { spaceship: SpaceshipType },
    ref: React.ForwardedRef<HTMLImageElement>
) { 
    return (
        <Image
            ref={ref}
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
