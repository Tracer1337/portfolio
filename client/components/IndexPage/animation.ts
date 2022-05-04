import { useCallback, useEffect, useRef } from "react"
import { animate, Animation, fix } from "../../lib/animation"

export function useAnimationController({
  containerRef,
  headerContainerRef,
  projectsSectionRef,
  landingAnimationContainerRef,
  headerAnimationRef,
  crashAnimationRef,
  landingAnimationRef
}: {
  containerRef: React.RefObject<HTMLDivElement>,
  headerContainerRef: React.RefObject<HTMLDivElement>,
  projectsSectionRef: React.RefObject<HTMLDivElement>,
  landingAnimationContainerRef: React.RefObject<HTMLDivElement>,
  headerAnimationRef: React.RefObject<Animation>,
  crashAnimationRef: React.RefObject<Animation>,
  landingAnimationRef: React.RefObject<Animation>
}) {
  const hasSetContainerDimensions = useRef(false)

  const handleScroll = useCallback(() => {
      const container = containerRef.current
      const headerContainer = headerContainerRef.current
      const projectsSection = projectsSectionRef.current
      const landingAnimationContainer = landingAnimationContainerRef.current
      const headerAnimation = headerAnimationRef.current
      const crashAnimation = crashAnimationRef.current
      const landingAnimation = landingAnimationRef.current

      if (
          !container ||
          !headerContainer ||
          !projectsSection ||
          !landingAnimationContainer ||
          !headerAnimation ||
          !crashAnimation ||
          !landingAnimation
      ) return

      fix(headerContainer, 0, 1200)
      animate(headerAnimation, 1000, 1200)

      fix(container, 0, 1000)
      animate(crashAnimation, 0, 1000)

      fix(landingAnimationContainer, 1500, 1500 + projectsSection.clientHeight - 500)
      animate(landingAnimation, 1500, 1500 + projectsSection.clientHeight - 500)
  }, [])

  useEffect(() => {
    if (
      !containerRef.current ||
      hasSetContainerDimensions.current
    ) return

    hasSetContainerDimensions.current = true

    containerRef.current.style.paddingBottom = `${
      1000 - (document.body.clientHeight - innerHeight)
    }px`
  }, [])

  useEffect(() => {
      window.addEventListener("scroll", handleScroll)
      return () => {
          window.removeEventListener("scroll", handleScroll)
      }
  }, [handleScroll])
}
