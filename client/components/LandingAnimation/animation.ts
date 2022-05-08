import React, { useEffect, useState } from "react"
import anime from "animejs"
import confetti from "canvas-confetti"
import { useDoneCallback } from "@lib/animation"

export function useLandingAnimation({ spaceshipRef }: {
    spaceshipRef: React.RefObject<HTMLImageElement>
}) {
    const [animation, setAnimation] = useState<anime.AnimeInstance>()

    const onDone = useDoneCallback()

    useEffect(() => {
        const spaceship = spaceshipRef.current

        if (!spaceship) return

        const anim = anime({
            targets: spaceship,
            translateX: 300,
            translateY: 150,
            scale: 0.5,
            rotate: {
                value: ["120deg", "-50deg"],
                easing: "linear",
                duration: 1 / 3
            },
            easing: "easeOutCubic",
            duration: 1,
            autoplay: false,
            update: (anim) => {
                onDone(anim.progress / 100, () => {
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
                })
            }
        })

        setAnimation(anim)
    }, [])

    return animation
}
