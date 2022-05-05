import React, { useEffect } from "react"
import { animate, Animation } from "../../lib/animation"
import { breakpoints, useMediaQuery } from "../../lib/responsive"

export function useAnimationController({
    containerRef,
    projectsSectionRef,
    landingAnimationContainerRef,
    backgroundAnimationRef,
    headerAnimationRef,
    crashAnimationRef,
    landingAnimationRef
}: {
    containerRef: React.RefObject<HTMLDivElement>,
    projectsSectionRef: React.RefObject<HTMLDivElement>,
    landingAnimationContainerRef: React.RefObject<HTMLDivElement>,
    backgroundAnimationRef: React.RefObject<Animation>,
    headerAnimationRef: React.RefObject<Animation>,
    crashAnimationRef: React.RefObject<Animation>,
    landingAnimationRef: React.RefObject<Animation>
}) {    
    const isLargeScreen = !useMediaQuery(breakpoints.m)

    useEffect(() => {
        const container = containerRef.current
        const projectsSection = projectsSectionRef.current
        const landingAnimationContainer = landingAnimationContainerRef.current

        const handleScroll = () => {
            if (headerAnimationRef.current && isLargeScreen) {
                animate(headerAnimationRef.current, 1000, 1200)
            }
            if (backgroundAnimationRef.current) {
                animate(backgroundAnimationRef.current, 0, document.body.clientHeight)
            }
        }

        let controller = new window.ScrollMagic.Controller()

        const scenes: ScrollMagic.Scene[] = []

        if (container && isLargeScreen) {
            const scene = new window.ScrollMagic.Scene({
                triggerElement: container,
                triggerHook: "onLeave",
                offset: -container.getBoundingClientRect().y,
                duration: 1000
            })
                .on("progress", (event: ScrollMagic.ProgressEvent) => {
                    crashAnimationRef.current?.update(event.progress)
                })
                .setPin(container)
                .addTo(controller)
            scenes.push(scene)
        }
        
        if (projectsSection && isLargeScreen) {
            const scene = new window.ScrollMagic.Scene({
                triggerElement: projectsSection,
                triggerHook: "onLeave",
                offset: -window.innerHeight / 4,
                duration: projectsSection.clientHeight - 800
            })
                .on("progress", (event: ScrollMagic.ProgressEvent) => {
                    landingAnimationRef.current?.update(event.progress)
                })
                .setPin(landingAnimationContainer)
                .addTo(controller)
            scenes.push(scene)
        }

        if (process.env.NODE_ENV === "development") {
            scenes.forEach((scene) => scene.addIndicators!())
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            controller.destroy(false)
        }
    }, [isLargeScreen])
}
