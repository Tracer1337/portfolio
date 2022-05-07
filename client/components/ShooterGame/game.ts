import React, { useEffect } from "react"
import Vector from "victor"
import { constrain } from "../../lib/animation"

const INITIAL_VEL = 20
const DRAG = 0.95
const SPEED = 10
const ROTATION_SPEED = 5
const SCROLL_MARGIN = 0.25
const SCROLL_VELOCITY_THRESHOLD = 0.5

export function usePlayerControls({ spriteRef }: {
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
        const vel = new Vector(0, INITIAL_VEL)
        const acc = new Vector(0, 0)

        let isUpKeyPressed = false
        let isLeftKeyPressed = false
        let isRightKeyPressed = false

        let lastTime = performance.now()

        const update = () => {
            const currentTime = performance.now()
            const deltaTime = currentTime - lastTime
            lastTime = currentTime

            acc.y = isUpKeyPressed ? deltaTime / (1/SPEED*100) : 0

            if (isLeftKeyPressed) {
                dir.rotateDeg(deltaTime / -(1/ROTATION_SPEED*10))
            }
            if (isRightKeyPressed) {
                dir.rotateDeg(deltaTime / (1/ROTATION_SPEED*10))
            }

            pos.add(new Vector(0, 0).copy(vel).rotateBy(dir.angle()))
            vel.add(acc)
            vel.multiplyScalar(DRAG)

            pos.x = constrain(pos.x, 0, window.innerWidth)
            pos.y = constrain(
                pos.y,
                window.scrollY,
                window.innerHeight + window.scrollY
            )

            if (vel.magnitude() > SCROLL_VELOCITY_THRESHOLD) {
                const margin = window.innerHeight * SCROLL_MARGIN
                const marginInverted = window.innerHeight * (1 - SCROLL_MARGIN)
                if (pos.y <= window.scrollY + margin) {
                    window.scrollTo({ top: pos.y - margin })
                }
                if (pos.y >= window.scrollY + marginInverted) {
                    window.scrollTo({ top: pos.y - marginInverted })
                }
            }
            
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
                    event.preventDefault()
                    isUpKeyPressed = true
                    break
                case "ArrowLeft":
                    event.preventDefault()
                    isLeftKeyPressed = true
                    break
                case "ArrowRight":
                    event.preventDefault()
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
