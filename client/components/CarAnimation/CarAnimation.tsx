/** @jsxImportSource @emotion/react */
import React, { useRef } from "react"
import { css } from "@emotion/react"
import { useCarAnimation } from "./animation"

function CarAnimation(props: React.ComponentProps<"div">) {
    const containerRef = useRef<HTMLDivElement>(null)
    const carRef = useRef<HTMLImageElement>(null)

    useCarAnimation({
        containerRef,
        carRef
    })
    
    return (
        <div
            ref={containerRef}
            css={css`
                position: relative;
                width: 100%;
            `}
            {...props}
        >
            <img
                src="/tesla-car.png"
                ref={carRef}
                css={css`
                    position: absolute;
                    right: -550px;
                    width: 550px;
                    height: 370px;
                `}
            />
        </div>
    )
}

export default CarAnimation
