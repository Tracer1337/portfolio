/** @jsxImportSource @emotion/react */
import React, { useRef } from "react"
import { css } from "@emotion/react"
import { useLandingAnimation } from "./animation"

function LandingAnimation(props: React.ComponentProps<"div">) {
    const containerRef = useRef<HTMLDivElement>(null)
    const spaceshipRef = useRef<HTMLImageElement>(null)
    const marsRef = useRef<HTMLImageElement>(null)

    useLandingAnimation({
        containerRef,
        spaceshipRef,
        marsRef
    })
    
    return (
        <div
            ref={containerRef}
            css={css`
                position: relative;
                height: 300px;
                width: 100%;
            `}
            {...props}
        >
            <img
                src="/mars.png"
                ref={marsRef}
                css={css`
                    position: absolute;
                    right: 100px;
                    bottom: 0;
                    width: 400px;
                    height: 400px;
                    transform: translate(-50%, 50%) rotate(-45deg);
                `}
            />
            <img
                src="/spacex-rocket.png"
                ref={spaceshipRef}
                css={css`
                    position: absolute;
                    right: 900px;
                    bottom: 200px;
                    width: 130px;
                    height: 173px;
                    transform: rotate(120deg);
                `}
            />
        </div>
    )
}

export default LandingAnimation
