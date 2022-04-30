/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import anime from "animejs"
import styled from "@emotion/styled"

function useAnimation({ targetRefs }: {
    targetRefs: [
        React.RefObject<HTMLDivElement>,
        React.RefObject<HTMLDivElement>
    ]
}) {
    const isAnimating = useRef(false)

    useEffect(() => {
        if (isAnimating.current) return

        const targets = targetRefs.map((ref) => ref.current)

        if (targets.some((target) => !target)) return

        isAnimating.current = true

        const duration = 1000

        const animation = anime({
            targets,
            easing: "linear",
            translateY: -100,
            duration,
            autoplay: false
        })

        const ScrollMagic = require("scrollmagic")

        const controller = new ScrollMagic.Controller()

        new ScrollMagic.Scene({
            triggerElement: "body",
            triggerHook: "onLeave",
            duration: window.innerHeight * 2
        })
            .on("progress", (event: ScrollMagic.ProgressEvent) => {
                animation.seek(event.progress * duration)
            })
            .addTo(controller)
    }, [])
}

const Starfield = styled.div`
    background-image: url("/starfield.png");
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
`

function Background() {
    const targetRef1 = useRef<HTMLDivElement>(null)
    const targetRef2 = useRef<HTMLDivElement>(null)

    useAnimation({ targetRefs: [targetRef1, targetRef2] })

    return (
        <div css={css`
            // https://mycolor.space/gradient3?ori=to+right+top&hex=%23000000&hex2=%2302000A&hex3=%23000000&submit=submit
            background-image: linear-gradient(to right top, #000000, #020001, #030002, #040004, #040006, #040006, #040006, #040006, #040004, #030002, #020001, #000000);
            position: fixed;
            top: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
        `}>
            <Starfield ref={targetRef1}/>
            <Starfield
                ref={targetRef2}
                css={css`transformY: 100%;`}
            />
        </div>
    )
}

export default Background
