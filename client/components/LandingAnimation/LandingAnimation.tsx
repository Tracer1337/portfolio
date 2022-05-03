/** @jsxImportSource @emotion/react */
import React, { useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import { useLandingAnimation } from "./animation"

function LandingAnimation({
    offset,
    duration,
    ...props
}: React.ComponentProps<"div"> & {
    offset: number,
    duration: number
}, ref: React.ForwardedRef<HTMLDivElement>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const spaceshipRef = useRef<HTMLImageElement>(null)
    const marsRef = useRef<HTMLImageElement>(null)

    useLandingAnimation({
        containerRef,
        spaceshipRef,
        marsRef,
        offset,
        duration
    })

    // @ts-ignore
    useImperativeHandle(ref, () => containerRef.current)
    
    return (
        <div ref={containerRef} {...props}>
            {props.children}
            <div css={css`
                position: relative;
                height: 500px;
                width: 500px;
            `}>
                <img
                    src="/mars.png"
                    ref={marsRef}
                    css={css`
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        width: 400px;
                        height: 400px;
                        transform: rotate(-45deg);
                    `}
                />
                <img
                    src="/spacex-rocket.png"
                    ref={spaceshipRef}
                    css={css`
                        position: absolute;
                        right: 600px;
                        bottom: 400px;
                        width: 130px;
                        height: 173px;
                        transform: rotate(120deg);
                    `}
                />
            </div>
        </div>
    )
}

export default React.forwardRef(LandingAnimation)
