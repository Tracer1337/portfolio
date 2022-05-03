/** @jsxImportSource @emotion/react */
import React, { useEffect, useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import { useCrashAnimation } from "./animation"

function CrashAnimation({
    offset,
    duration,
    ...props
}: React.ComponentProps<"div"> & {
    offset: number,
    duration: number
}, ref: React.ForwardedRef<HTMLDivElement>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const spaceshipRef = useRef<HTMLImageElement>(null)
    const moonRef = useRef<HTMLImageElement>(null)
    const explosionRef = useRef<HTMLImageElement>(null)

    useCrashAnimation({
        containerRef,
        spaceshipRef,
        moonRef,
        explosionRef,
        offset,
        duration
    })

    // @ts-ignore
    useImperativeHandle(ref, () => containerRef.current)
    
    return (
        <div ref={containerRef} {...props}>
            <div css={css`
                position: relative;
                width: 500px;
                height: 300px;
            `}>
                <img
                    src="/moon.png"
                    ref={moonRef}
                    css={css`
                        position: absolute;
                        bottom: 0;
                        width: 200px;
                        height: 200px;
                    `}
                />
                <img
                    ref={explosionRef}
                    css={css`
                        position: absolute;
                        bottom: 0;
                    `}
                />
                <img
                    src="/nasa-rocket.png"
                    ref={spaceshipRef}
                    css={css`
                        position: absolute;
                        left: 400px;
                        bottom: 100px;
                        width: 98px;
                        height: 102px;
                        transform: rotate(-80deg);
                    `}
                />
            </div>
            {props.children}
        </div>
    )
}

export default React.forwardRef(CrashAnimation)
