import React, { useEffect, useRef, useState } from "react"
import anime from "animejs"
import { useImagePreload } from "@lib/preload"
import { useDoneCallback } from "@lib/animation"
import explosionImage from "@assets/explosion.gif"

const rotationStage2Begin = 0.6

export function useCrashAnimation({
    spaceshipRef,
    moonRef,
    explosionRef
}: {
    spaceshipRef: React.RefObject<HTMLImageElement>,
    moonRef: React.RefObject<HTMLImageElement>,
    explosionRef: React.RefObject<HTMLImageElement>
}) {
    const [animation, setAnimation] = useState<anime.AnimeInstance>()

    const explosionTimeoutRef = useRef<number>()

    const onDone = useDoneCallback()

    useImagePreload([explosionImage.src])

    useEffect(() => {
        const spaceship = spaceshipRef.current
        const moon = moonRef.current
        const explosion = explosionRef.current

        if (!spaceship || !moon || !explosion) return

        const animatedValues = {
            scale: 1,
            opacity: 1
        }
        
        const scaleAnimation = anime({
            targets: animatedValues,
            scale: 0.1,
            opacity: [1, 0.9, 0],
            easing: "easeInExpo",
            duration: 1,
            autoplay: false
        })

        const anim = anime({
            targets: spaceship,
            easing: "linear",
            duration: 1,
            autoplay: false,
            update: (anim) => {
                const progress = anim.progress / 100
                const target = anim.animatables[0].target

                scaleAnimation.seek(progress)
                
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

                if (progress < 1) {
                    moon.style.display = ""
                    explosion.src = ""
                    explosion.style.display = "none"
                }

                onDone(progress, () => {
                    moon.style.display = "none"
                    explosion.src = explosionImage.src
                    explosion.style.display = "block"
                    clearTimeout(explosionTimeoutRef.current)
                    explosionTimeoutRef.current = setTimeout(() => {
                        explosion.src = ""
                        explosion.style.display = "none"
                    }, 800) as any as number
                })
            }
        })

        setAnimation(anim)
    }, [])

    return animation
}
