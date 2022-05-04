import { useEffect, useState } from "react"
import anime from "animejs"

export function useParallaxAnimation({ targetRefs }: {
  targetRefs: [
      React.RefObject<HTMLDivElement>,
      React.RefObject<HTMLDivElement>
  ]
}) {
    const [animation, setAnimation] = useState<anime.AnimeInstance>()

    useEffect(() => {
        const targets = targetRefs.map((ref) => ref.current)

        if (targets.some((target) => !target)) return
        
        const anim = anime({
            targets,
            easing: "linear",
            translateY: -100,
            duration: 1,
            autoplay: false
        })

        setAnimation(anim)
    }, [])

    return animation
}
