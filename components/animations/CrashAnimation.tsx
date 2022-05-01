/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef } from "react"
import { css } from "@emotion/react"
import anime from "animejs"

function useAnimation({
    containerRef,
    spaceshipRef,
    moonRef,
    explosionRef
}: {
    containerRef: React.RefObject<HTMLDivElement>,
    spaceshipRef: React.RefObject<HTMLImageElement>,
    moonRef: React.RefObject<HTMLImageElement>,
    explosionRef: React.RefObject<HTMLImageElement>,
}) {
    const isAnimating = useRef(false)

    useEffect(() => {
        if (isAnimating.current) return

        const container = containerRef.current
        const spaceship = spaceshipRef.current
        const moon = moonRef.current
        const explosion = explosionRef.current

        if (!container || !spaceship || !moon || !explosion) return

        isAnimating.current = true

        const duration = 500
        const rotationStage2Begin = 0.6

        const animatedValues = {
            scale: 1,
            opacity: 1
        }
        
        const scaleAnimation = anime({
            targets: animatedValues,
            scale: 0.1,
            opacity: [1, 0.9, 0],
            easing: "easeInExpo",
            duration,
            autoplay: false
        })

        const animation = anime({
            targets: spaceship,
            easing: "linear",
            duration,
            autoplay: false,
            update: (anim) => {
                const progress = anim.progress / 100
                const target = anim.animatables[0].target

                scaleAnimation.seek(progress * duration)
                
                const translateX = Math.cos(progress * Math.PI / 2) * 300 - 300
                const translateY = Math.sin(progress * Math.PI) * -200
                const rotationStage2 = Math.max((progress - rotationStage2Begin), 0) / (1 - rotationStage2Begin) * 450
                const rotate = -80 - progress * 120 - rotationStage2

                target.style.transform = `
                    translateX(${translateX}px)
                    translateY(${translateY}px)
                    rotate(${rotate}deg)
                    scale(${animatedValues.scale})
                `
                target.style.opacity = animatedValues.opacity.toString()
            }
        })

        const ScrollMagic = require("scrollmagic")

        const controller = new ScrollMagic.Controller()

        new ScrollMagic.Scene({
            triggerElement: container,
            offset: 200,
            duration
        })
            .on("progress", (event: ScrollMagic.ProgressEvent) => {
                animation.seek(event.progress * duration)
            })
            .setPin(container)
            .addTo(controller)
    }, [])
}

function CrashAnimation(props: React.ComponentProps<"div">) {
    const containerRef = useRef<HTMLDivElement>(null)
    const spaceshipRef = useRef<HTMLImageElement>(null)
    const moonRef = useRef<HTMLImageElement>(null)
    const explosionRef = useRef<HTMLImageElement>(null)

    useAnimation({
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
            <img src="/nasa-rocket.png" ref={moonRef} style={{ display: "none" }}/>
            <img src="/nasa-rocket.png" ref={explosionRef} style={{ display: "none" }}/>
        </div>
    )
}

export default CrashAnimation
