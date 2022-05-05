import React, { useEffect } from "react"
import { animate, Animation } from "../../lib/animation"

export function useAnimationController({
    containerRef,
    headerContainerRef,
    techstackSectionRef,
    projectsSectionRef,
    landingAnimationContainerRef,
    backgroundAnimationRef,
    headerAnimationRef,
    crashAnimationRef,
    landingAnimationRef
}: {
    containerRef: React.RefObject<HTMLDivElement>,
    headerContainerRef: React.RefObject<HTMLDivElement>,
    techstackSectionRef: React.RefObject<HTMLDivElement>,
    projectsSectionRef: React.RefObject<HTMLDivElement>,
    landingAnimationContainerRef: React.RefObject<HTMLDivElement>,
    backgroundAnimationRef: React.RefObject<Animation>,
    headerAnimationRef: React.RefObject<Animation>,
    crashAnimationRef: React.RefObject<Animation>,
    landingAnimationRef: React.RefObject<Animation>
}) {
    useEffect(() => {
        const container = containerRef.current
        const headerContainer = headerContainerRef.current
        const projectsSection = projectsSectionRef.current
        const landingAnimationContainer = landingAnimationContainerRef.current
  
        if (
            !container ||
            !headerContainer ||
            !projectsSection ||
            !landingAnimationContainer
        ) return

        const handleScroll = () => {
            if (!headerAnimationRef.current) return
            animate(headerAnimationRef.current, 1000, 1200)
        }

        const controller = new window.ScrollMagic.Controller()

        const scenes: ScrollMagic.Scene[] = []

        scenes.push(
            new window.ScrollMagic.Scene({
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
        )
        
        scenes.push(
            new window.ScrollMagic.Scene({
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
        )

        if (process.env.NODE_ENV === "development") {
            scenes.forEach((scene) => scene.addIndicators!())
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
            controller.destroy(false)
        }
    }, [])
}
