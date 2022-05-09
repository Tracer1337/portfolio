/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react"
import { css } from "@emotion/react"

function Timer({
    duration,
    onDone,
    ...props
}: React.ComponentProps<"div"> & {
    duration: number,
    onDone: () => void
}) {
    const [displayTime, setDisplayTime] = useState(duration)

    useEffect(() => {
        if (displayTime <= 0) {
            onDone()
        }
    }, [displayTime])

    useEffect(() => {
        const id = setTimeout(() => {
            setDisplayTime(displayTime - 1)
        }, 1000)
        return () => clearTimeout(id)
    }, [displayTime])
    
    return (
        <div
            css={css`
                width: 64px;
                padding: 0 16px;
                font-size: 28px;
                display: flex;
                justify-content: center;
                align-items: center
            `}
            {...props}
        >
            {displayTime}
        </div>
    )
}

export default Timer
