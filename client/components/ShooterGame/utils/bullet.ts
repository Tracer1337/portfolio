import React, { useEffect, useState } from "react"
import Vector from "victor"
import { UpdateFunction } from "./game"
import { Intersection, Raycaster } from "./raycaster"
import { Spaceship } from "./spaceships"
import { Target, TargetManager } from "./target"

const SPEED = 3

export type BulletManager = {
    request: (args: {
        currentTime: number,
        pos: Vector,
        vel: Vector,
        dir: Vector
    }) => void,
    spawn: (args: {
        pos: Vector,
        vel: Vector,
        dir: Vector
    }) => void,
    update: UpdateFunction,
    destroy: () => void
}

export type Bullet = {
    element: HTMLDivElement,
    origin: Vector,
    pos: Vector,
    vel: Vector,
    dir: Vector,
    dist: number,
    pierce: number,
    damage: number
}

export function useBulletManager({
    spaceship,
    spriteRef,
    targetManager,
    raycaster
}: {
    spaceship: Spaceship,
    spriteRef: React.RefObject<HTMLImageElement>,
    targetManager?: TargetManager,
    raycaster?: Raycaster
}) {
    const [bulletManager, setBulletManager] = useState<BulletManager>()

    useEffect(() => {
        const sprite = spriteRef.current

        const bullets: Bullet[] = []

        let lastShotTime: number
        let shootIndex = 0

        const createElement = () => {
            const element = document.createElement("div")
            element.style.width = "2px"
            element.style.height = `${spaceship.bullet.length}px`
            element.style.position = "absolute"
            element.style.top = "0"
            element.style.backgroundColor = spaceship.bullet.color
            return element
        }

        const findTravelDistance = (intersections: Intersection[]) => {
            if (!targetManager) return -1
            let pierce = spaceship.bullet.pierce
            const hits = new Set<Target>()
            for (let { wall, dist } of intersections) {
                const target = targetManager.getTargetFromWall(wall)
                if (!target || target.isDestroyed || hits.has(target)) {
                    continue
                }
                hits.add(target)
                if (--pierce === 0) {
                    return dist
                }
            }
            return Infinity
        }

        const scheduleTargetHits = (
            bullet: Bullet,
            intersections: Intersection[]
        ) => {
            if (!targetManager) return -1
            let pierce = spaceship.bullet.pierce
            const hits = new Set<Target>()
            for (let { wall, dist } of intersections) {
                const target = targetManager.getTargetFromWall(wall)
                if (!target || target.isDestroyed || hits.has(target)) {
                    continue
                }
                hits.add(target)
                targetManager.scheduleHit(target, bullet, dist)
                if (--pierce === 0) {
                    return
                }
            }
        }

        const createBullet = ({ origin, pos, dir, vel }: {
            origin: Vector,
            pos: Vector,
            dir: Vector,
            vel: Vector
        }): Bullet | undefined => {
            if (
                !sprite ||
                !raycaster ||
                !targetManager
            ) return undefined

            const spritePos = new Vector(
                sprite.clientWidth,
                sprite.clientHeight
            )

            const bulletPos = new Vector(0, 0)
                .add(spritePos.clone().multiplyScalar(-0.5))
                .add(spritePos.clone().multiply(origin))
                .rotate(dir.angle()-Math.PI/2)
                .add(pos)
            
            const bulletVel = dir.clone()
                .rotate(Math.PI)
                .multiplyScalar(SPEED)
                .add(vel.clone().rotate(dir.angle()+Math.PI/2))
            
            const bulletDir = dir.clone()

            const intersections = raycaster.cast(bulletPos, bulletDir)

            const bullet: Bullet = {
                pierce: spaceship.bullet.pierce,
                damage: spaceship.bullet.damage,
                element: createElement(),
                origin: bulletPos.clone(),
                pos: bulletPos.clone(),
                vel: bulletVel,
                dir: bulletDir,
                dist: findTravelDistance(intersections)
            }

            scheduleTargetHits(bullet, intersections)

            return bullet
        }

        const removeBullet = (index: number) => {
            document.body.removeChild(bullets[index].element)
            bullets.splice(index, 1)
        }

        const spawn: BulletManager["spawn"] = ({ pos, dir, vel }) => {
            spaceship
                .getBulletOrigins(shootIndex++)
                .forEach((origin) => {
                    const bullet = createBullet({ origin, pos, dir, vel })
                    if (!bullet) return
                    bullets.push(bullet)
                    document.body.appendChild(bullet.element)
                })
        }
        
        const request: BulletManager["request"] = ({
            currentTime,
            pos,
            dir,
            vel
        }) => {
            if (
                !lastShotTime ||
                currentTime - lastShotTime >= 1000 / spaceship.bullet.frequency
            ) {
                lastShotTime = currentTime
                spawn({ pos, dir, vel })
            }
        }

        const update: UpdateFunction = ({ deltaTime }) => {
            for (let i = bullets.length - 1; i >= 0; i--) {
                const { element, pos, vel, dir, origin, dist } = bullets[i]

                pos.add(vel.clone().multiplyScalar(deltaTime))

                element.style.transform = `
                    translate(${pos.x}px, ${pos.y}px)
                    rotate(${dir.angle()-Math.PI/2}rad)
                `

                if (
                    pos.distance(origin) >= dist ||
                    pos.x < 0 || pos.x >= document.body.clientWidth ||
                    pos.y < 0 || pos.y >= document.body.clientHeight
                ) {
                    removeBullet(i)
                    continue
                }
            }
        }

        const destroy: BulletManager["destroy"] = () => {
            bullets.forEach((bullet) => {
                try {
                    document.body.removeChild(bullet.element)
                } catch {}
            })
        }

        setBulletManager({
            request,
            spawn,
            update,
            destroy
        })

        return destroy
    }, [targetManager])

    return bulletManager
}
