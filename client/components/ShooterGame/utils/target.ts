import { useEffect, useState } from "react"
import Vector from "victor"
import type { Bullet } from "./bullet"
import type { ScoreManager } from "./score"
import { useImagePreload } from "@lib/preload"
import { Raycaster, Wall } from "./raycaster"
import explosionImage from "@assets/explosion.gif"
import { UpdateFunction } from "./game"

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
    update: UpdateFunction,
    scheduleHit: (
        target: Target,
        bullet: Bullet,
        dist: number
    ) => void,
    getTargetFromWall: (wall: Wall) => Target | undefined,
    destroy: () => void
}

export type Target = {
    element: Element,
    pos: Vector,
    dim: Vector,
    initialHealth: number,
    health: number,
    healthbar: HTMLDivElement,
    healthbarIndicator: HTMLDivElement,
    healthbarTimeout?: number,
    isDestroyed: boolean
}

export function useTargetManager({ scoreManager, raycaster }: {
    scoreManager?: ScoreManager,
    raycaster?: Raycaster
}) {
    const [targetManager, setTargetManager] = useState<TargetManager>()

    useImagePreload([explosionImage.src])

    useEffect(() => {
        const createTarget = (element: Element): Target => {
            const health = Math.ceil(
                element.clientWidth * element.clientHeight / 1000
            )
        
            const rect = element.getBoundingClientRect()

            const pos = new Vector(rect.x + window.scrollX, rect.y + window.scrollY)
            const dim = new Vector(rect.width, rect.height)

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
                ${pos.x + rect.width / 2 - healthbarWidth / 2}px,
                ${pos.y + rect.height}px
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
                pos,
                dim,
                initialHealth: health,
                health,
                healthbar,
                healthbarIndicator,
                isDestroyed: false
            }
        }

        const targets = new Map<Element, Target>()

        document
            .querySelectorAll(`[${SHOOTABLE_ATTR}]`)
            .forEach((element) => targets.set(
                element,
                createTarget(element)
            ))

        const walls = new Map<Wall, Target>()

        targets.forEach((target) => {
            const { x, y, width, height } = target.element.getBoundingClientRect()
            walls.set({
                a: new Vector(x, y),
                b: new Vector(x + width, y)
            }, target)
            walls.set({
                a: new Vector(x + width, y),
                b: new Vector(x + width, y + height)
            }, target)
            walls.set({
                a: new Vector(x + width, y + height),
                b: new Vector(x, y + height)
            }, target)
            walls.set({
                a: new Vector(x, y + height),
                b: new Vector(x, y)
            }, target)
        })

        raycaster?.setWalls(Array.from(walls.keys()))

        const scheduledHits: {
            bullet: Bullet,
            target: Target,
            dist: number
        }[] = []

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

        const destroyTarget = (target: Target) => {
            scoreManager?.addScore(target.initialHealth)
            target.element.setAttribute(DESTROYED_ATTR, "true")
            target.healthbar.style.opacity = "0"
            target.isDestroyed = true
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
            scoreManager?.addScore(Math.min(damage, target.health))
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
            if (target.isDestroyed) return
            drawHealth(target, bullet.damage)
            if (target.health <= 0) {
                destroyTarget(target)
            }
        }

        const scheduleHit: TargetManager["scheduleHit"] = (
            target,
            bullet,
            dist
        ) => {
            scheduledHits.push({ bullet, target, dist })
        }

        const destroy: TargetManager["destroy"] = () => {
            targets.forEach((target) => {
                target.element.removeAttribute(DESTROYED_ATTR)
                try {
                    document.body.removeChild(target.healthbar)
                } catch {}
            })
        }

        const update: UpdateFunction = ({ deltaTime }) => {
            for (let i = scheduledHits.length - 1; i >= 0; i--) {
                const { target, bullet } = scheduledHits[i]
                scheduledHits[i].dist -= bullet.vel
                    .clone()
                    .multiplyScalar(deltaTime)
                    .magnitude()
                if (scheduledHits[i].dist <= 0) {
                    scheduledHits.splice(i, 1)
                    hit(target, bullet)
                }
            }
        }

        setTargetManager({
            update,
            destroy,
            scheduleHit,
            getTargetFromWall: walls.get.bind(walls)
        })

        return destroy
    }, [scoreManager])

    return targetManager
}
