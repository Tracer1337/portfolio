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
    const [isRunning, setIsRunning] = useState(true)

    useEffect(() => {
        if (displayTime <= 0) {
            setIsRunning(false)
            onDone()
        }
    }, [displayTime])

    useEffect(() => {
        if (!isRunning) return
        const id = setTimeout(() => {
            setDisplayTime(displayTime - 1)
        }, 1000)
        return () => clearTimeout(id)
    }, [displayTime, isRunning])
    
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
