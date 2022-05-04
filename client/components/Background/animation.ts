import { useEffect, useRef } from "react"
import anime from "animejs"

export function useParallaxAnimation({ targetRefs }: {
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
          duration: document.body.clientHeight * 2
      })
          .on("progress", (event: ScrollMagic.ProgressEvent) => {
              animation.seek(event.progress * duration)
          })
          .addTo(controller)
  }, [])
}
