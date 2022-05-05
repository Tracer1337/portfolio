import React, { useEffect, useState } from "react"
import anime from "animejs"

export function useHeaderAnimation({
    leftElementRef,
    rightElementRef
}: {
    leftElementRef: React.RefObject<HTMLDivElement>,
    rightElementRef: React.RefObject<HTMLDivElement>
}) {
    const [animation, setAnimation] = useState<anime.AnimeInstance>()

    useEffect(() => {
        const leftElement = leftElementRef.current
        const rightElement = rightElementRef.current
        
        if (!leftElement || !rightElement) return

        const anim = anime.timeline({
            easing: "linear",
            duration: 1,
            autoplay: false
        })
        .add({
            targets: leftElement,
            opacity: 0,
            translateX: -200
        })
        .add({
            targets: rightElement,
            opacity: 0,
            translateX: 200
        }, "-=1")
        
        setAnimation(anim)
    }, [])

    return animation
}
