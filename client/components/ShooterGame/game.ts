import React, { useEffect } from "react"
import Vector from "victor"

export function useGame({ spriteRef }: {
    spriteRef: React.RefObject<HTMLImageElement>
}) {
    useEffect(() => {
        const sprite = spriteRef.current

        if (!sprite) return

        const pos = new Vector(
            window.innerWidth / 2,
            0
        )
        const dir = new Vector(0, -1)
        const vel = new Vector(0, 20)
        const acc = new Vector(0, 0)
        const drag = 0.95

        let isUpKeyPressed = false
        let isLeftKeyPressed = false
        let isRightKeyPressed = false

        let lastTime = performance.now()

        const update = () => {
            const currentTime = performance.now()
            const deltaTime = currentTime - lastTime
            lastTime = currentTime

            acc.y = isUpKeyPressed ? deltaTime / 12 : 0

            if (isLeftKeyPressed) {
                dir.rotateDeg(deltaTime / -2)
            }
            if (isRightKeyPressed) {
                dir.rotateDeg(deltaTime / 2)
            }

            // pos.add(vel)
            // vel.add(new Vector(0, 0).copy(acc).rotateBy(dir.angle()))
            pos.add(new Vector(0, 0).copy(vel).rotateBy(dir.angle()))
            vel.add(acc)
            vel.multiplyScalar(drag)
            
            sprite.style.transform = `
                translate(
                    ${pos.x - sprite.clientWidth / 2}px,
                    ${pos.y - sprite.clientHeight / 2}px
                )
                rotate(${dir.horizontalAngleDeg()-90}deg)
            `
            
            requestAnimationFrame(update)
        }

        requestAnimationFrame(update)

        const handleKeyDown = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    isUpKeyPressed = true
                    break
                case "ArrowLeft":
                    isLeftKeyPressed = true
                    break
                case "ArrowRight":
                    isRightKeyPressed = true
                    break
            }
        }

        const handleKeyUp = (event: KeyboardEvent) => {
            switch (event.key) {
                case "ArrowUp":
                    isUpKeyPressed = false
                    break
                case "ArrowLeft":
                    isLeftKeyPressed = false
                    break
                case "ArrowRight":
                    isRightKeyPressed = false
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])
}
