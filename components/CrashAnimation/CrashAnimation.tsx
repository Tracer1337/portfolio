/** @jsxImportSource @emotion/react */
import React, { useRef } from "react"
import { css } from "@emotion/react"
import { useCrashAnimation } from "./animation"

function CrashAnimation(props: React.ComponentProps<"div">) {
    const containerRef = useRef<HTMLDivElement>(null)
    const spaceshipRef = useRef<HTMLImageElement>(null)
    const moonRef = useRef<HTMLImageElement>(null)
    const explosionRef = useRef<HTMLImageElement>(null)

    useCrashAnimation({
        containerRef,
        spaceshipRef,
        moonRef,
        explosionRef
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
                src="/moon.png"
                ref={moonRef}
                css={css`
                    position: absolute;
                    left: 300px;
                    bottom: 0;
                    width: 200px;
                    height: 200px;
                    transform: translate(-50%, 50%);
                `}
            />
            <img
                ref={explosionRef}
                css={css`
                    position: absolute;
                    left: 300px;
                    bottom: 0;
                    transform: translate(-50%, 50%);
                `}
            />
            <img
                src="/nasa-rocket.png"
                ref={spaceshipRef}
                css={css`
                    position: absolute;
                    left: 600px;
                    bottom: 0;
                    width: 98px;
                    height: 102px;
                    transform: rotate(-80deg);
                `}
            />
        </div>
    )
}

export default CrashAnimation
