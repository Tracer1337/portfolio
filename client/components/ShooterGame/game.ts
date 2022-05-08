import { useEffect } from "react"

export type UpdateFunction = (args: {
    currentTime: number,
    deltaTime: number
}) => void

export function useGameLoop(onUpdate: UpdateFunction) {
    useEffect(() => {
        let shouldUpdate = true
        let lastTime = performance.now()

        const update = () => {
            const currentTime = performance.now()
            const deltaTime = currentTime - lastTime
            lastTime = currentTime

            onUpdate({ currentTime, deltaTime })

            if (shouldUpdate) {
                requestAnimationFrame(update)
            }
        }

        requestAnimationFrame(update)

        return () => {
            shouldUpdate = false
        }
    }, [onUpdate])
}
