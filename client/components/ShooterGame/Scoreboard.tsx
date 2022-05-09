/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import anime from "animejs"
import React, { useImperativeHandle, useRef, useState } from "react"

export type ScoreboardRef = {
    setScore: (score: number) => void
}

function Scoreboard(
    props: React.ComponentProps<"div">,
    ref: React.ForwardedRef<ScoreboardRef>
) {
    const containerRef = useRef<HTMLDivElement>(null)
    const animation = useRef<anime.AnimeInstance>()
    const currentIteration = useRef(0)
    
    const [score, setScore] = useState(0)

    useImperativeHandle(ref, () => ({
        setScore: (value) => {
            setScore(value)

            const isActiveAnimation = !!animation.current

            if (!isActiveAnimation) {
                currentIteration.current = 0
            }

            animation.current?.pause()

            const scaleOffset = Math.min(currentIteration.current++, 30) / 60

            animation.current = anime({
                targets: containerRef.current,
                scale: isActiveAnimation
                    ? [1 + scaleOffset, 1.1 + scaleOffset, 1]
                    : [1, 1.1, 1],
                duration: 100,
                easing: "linear",
                complete: () => {
                    animation.current = undefined
                }
            })
        }
    }))

    return (
        <div
            ref={containerRef}
            css={css`
                min-width: 64px;
                text-align: center;
                position: fixed;
                top: 32px;
                right: 50%;
                transform: translateX(50%);
                padding: 16px;
                border: 1px solid #fff;
                background-color: rgba(0, 0, 0, .87);
            `}
            {...props}
        >
            {score}
        </div>
    )
}

export default React.forwardRef(Scoreboard)
