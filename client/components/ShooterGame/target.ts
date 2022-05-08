import { useEffect, useState } from "react"
import type { Bullet } from "./bullet"
import { useImagePreload } from "../../lib/preload"
import explosionImage from "../../assets/explosion.gif"

const SHOOTABLE_ATTR = "data-shootable"
const DESTROYED_ATTR = "data-destroyed"
const EXPLOSION_ANIM_DURATION = 800
const HEALTHBAR_HEALTH_WIDTH = 10
const HEALTHBAR_HEIGHT = 10
const HEALTHBAR_COLOR = "rgba(255, 0, 0, 0.3)"
const HEALTHBAR_INDICATOR_COLOR = "red"
const HEALTHBAR_TRANSITION_DURATION = 200
const HEALTHBAR_ON_SCREEN_DURATION = 500

export type TargetManager = {
    detect(bullet: Bullet): boolean
}

export type Target = {
    element: Element,
    health: number,
    healthbar: HTMLDivElement,
    healthbarIndicator: HTMLDivElement,
    healthbarTimeout?: number
}

export function useTargetManager() {
    const [targetManager, setTargetManager] = useState<TargetManager>()

    useImagePreload([explosionImage.src])

    useEffect(() => {
        const createTarget = (element: Element): Target => {
            const health = Math.ceil(
                element.clientWidth * element.clientHeight / 1000
            )
        
            const rect = element.getBoundingClientRect()

            const healthbarWidth = health * HEALTHBAR_HEALTH_WIDTH
        
            const healthbar = document.createElement("div")
            healthbar.style.width = `${healthbarWidth}px`
            healthbar.style.height = `${HEALTHBAR_HEIGHT}px`
            healthbar.style.backgroundColor = HEALTHBAR_COLOR
            healthbar.style.opacity = "0"
            healthbar.style.transition = `all ${HEALTHBAR_TRANSITION_DURATION}ms`
            healthbar.style.position = "absolute"
            healthbar.style.top = "0"
            healthbar.style.transform = `translate(
                ${rect.x + rect.width / 2 - healthbarWidth / 2 + window.scrollX}px,
                ${rect.y + rect.height + window.scrollY}px
            )`

            const healthbarIndicator = document.createElement("div")
            healthbarIndicator.style.width = `${healthbarWidth}px`
            healthbarIndicator.style.height = "100%"
            healthbarIndicator.style.backgroundColor = HEALTHBAR_INDICATOR_COLOR
            healthbarIndicator.style.transition = `all ${HEALTHBAR_TRANSITION_DURATION}ms`
        
            healthbar.appendChild(healthbarIndicator)
            document.body.appendChild(healthbar)
        
            return {
                element,
                health,
                healthbar,
                healthbarIndicator
            }
        }

        const targets = new Map<Element, Target>()

        document
            .querySelectorAll(`[${SHOOTABLE_ATTR}]`)
            .forEach((element) => targets.set(
                element,
                createTarget(element)
            ))

        const hits = new Map<Bullet, Set<Target>>()

        const createExplosion = (target: Target) => {
            return new Promise<HTMLImageElement>((resolve) => {
                const rect = target.element.getBoundingClientRect()
                const element = document.createElement("img")
                element.src = explosionImage.src
                element.onload = () => {
                    const ratio = element.naturalHeight / element.naturalWidth
                    const width = target.element.clientWidth
                    const height = width * ratio
                    element.style.width = `${target.element.clientWidth}px`
                    element.style.position = "absolute"
                    element.style.top = "0"
                    element.style.transform = `translate(
                        ${rect.x + rect.width / 2 - width / 2 + window.scrollX}px,
                        ${rect.y + rect.height / 2 - height / 2 + window.scrollY}px
                    )`
                    resolve(element)
                }
            })
        }

        const destroy = (target: Target) => {
            target.element.setAttribute(DESTROYED_ATTR, "true")
            target.healthbar.style.opacity = "0"
            targets.delete(target.element)
            createExplosion(target).then((explosion) => {
                document.body.appendChild(explosion)
                setTimeout(
                    () => document.body.removeChild(explosion),
                    EXPLOSION_ANIM_DURATION
                )
            })
        }

        const drawHealth = (target: Target, damage: number) => {
            clearTimeout(target.healthbarTimeout)

            target.health -= damage
            target.healthbar.style.opacity = "1"
            target.healthbarIndicator.style.width = `${
                Math.max(target.health * HEALTHBAR_HEALTH_WIDTH, 0)
            }px`

            target.healthbarTimeout = setTimeout(
                () => target.healthbar.style.opacity = "0",
                HEALTHBAR_ON_SCREEN_DURATION
            ) as any as number
        }

        const hit = (target: Target, bullet: Bullet) => {
            drawHealth(target, bullet.damage)
            if (target.health <= 0) {
                destroy(target)
            }
        }

        const detect: TargetManager["detect"] = (bullet) => {            
            const { pos } = bullet

            if (!hits.has(bullet)) {
                hits.set(bullet, new Set())
            }

            for (let target of Array.from(targets.values())) {
                if (hits.get(bullet)!.has(target)) {
                    continue
                }

                const rect = target.element.getBoundingClientRect()
                const x = rect.x + window.scrollX
                const y = rect.y + window.scrollY

                if (
                    pos.x >= x && pos.x <= x + rect.width &&
                    pos.y >= y && pos.y <= y + rect.height
                ) {
                    hits.get(bullet)!.add(target)
                    hit(target, bullet)
                    return true
                }
            }

            return false
        }

        setTargetManager({ detect })
    }, [])

    return targetManager
}
