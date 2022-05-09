/** @jsxImportSource @emotion/react */
import React, { useImperativeHandle, useRef } from "react"
import { css } from "@emotion/react"
import anime from "animejs"

export type ScoreboardRef = {
    reset: (score: number) => void,
    setScore: (score: number) => void
}

function Scoreboard(
    props: React.ComponentProps<"div">,
    ref: React.ForwardedRef<ScoreboardRef>
) {
    const containerRef = useRef<HTMLDivElement>(null)
    const animation = useRef<anime.AnimeInstance>()
    const currentIteration = useRef(0)

    useImperativeHandle(ref, () => ({
        reset: (value) => {
            if (!containerRef.current) return
            containerRef.current.textContent = value.toString()
        },

        setScore: (value) => {
            if (!containerRef.current) return

            containerRef.current.textContent = value.toString()

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
                padding: 16px;
                border: 1px solid #fff;
            `}
            {...props}
        />
    )
}

export default React.forwardRef(Scoreboard)
