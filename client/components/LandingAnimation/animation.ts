import React, { useEffect } from "react"
import anime from "animejs"
import confetti from "canvas-confetti"

export function useLandingAnimation({
    containerRef,
    spaceshipRef,
    marsRef,
    offset,
    duration
}: {
    containerRef: React.RefObject<HTMLDivElement>,
    spaceshipRef: React.RefObject<HTMLImageElement>,
    marsRef: React.RefObject<HTMLImageElement>,
    offset: number,
    duration: number
}) {
    useEffect(() => {
        if (duration <= 0) return

        const container = containerRef.current
        const spaceship = spaceshipRef.current
        const mars = marsRef.current

        if (!container || !spaceship || !mars) return

        const animation = anime({
            targets: spaceship,
            translateX: 300,
            translateY: 150,
            scale: 0.5,
            rotate: {
                value: ["120deg", "-50deg"],
                easing: "linear",
                duration: duration / 3
            },
            easing: "easeOutCubic",
            duration,
            autoplay: false,
            update: (anim) => {
                if (anim.progress === 100) {
                    const defaults: Partial<confetti.Options> = {
                        spread: 55,
                        startVelocity: 55,
                        particleCount: 75
                    }
                    confetti({
                        origin: { x: 0, y: 1 },
                        angle: 60,
                        ...defaults
                    })
                    confetti({
                        origin: { x: 1, y: 1 },
                        angle: 120,
                        ...defaults
                    })
                }
            }
        })

        const controller = new window.ScrollMagic.Controller()

        // @ts-ignore
        new window.ScrollMagic.Scene({
            triggerElement: container,
            offset,
            duration,
        })
            .on("progress", (event: ScrollMagic.ProgressEvent) => {
                animation.seek(event.progress * duration)
            })
            .setPin(container)
            .addTo(controller)
            .addIndicators()
        
        return () => controller.destroy(false)
    }, [offset, duration])
}
