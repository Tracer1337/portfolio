import React, { useEffect, useRef } from "react"
import anime from "animejs"

const duration = 10000

export function useCarAnimation({
    containerRef,
    carRef
}: {
    containerRef: React.RefObject<HTMLDivElement>,
    carRef: React.RefObject<HTMLImageElement>
}) {
    const isAnimating = useRef(false)

    useEffect(() => {
        if (isAnimating.current) return

        const container = containerRef.current
        const car = carRef.current

        if (!container || !car) return

        isAnimating.current = true

        const animation = anime({
            targets: car,
            translateX: -(window.innerWidth + car.clientWidth * 2),
            duration,
            autoplay: false
        })

        const ScrollMagic = require("scrollmagic")

        const controller = new ScrollMagic.Controller()

        new ScrollMagic.Scene({
            triggerElement: container,
            duration
        })
            .on("progress", (event: ScrollMagic.ProgressEvent) => {
                animation.seek(event.progress * duration)
            })
            .addTo(controller)
    }, [])
}
