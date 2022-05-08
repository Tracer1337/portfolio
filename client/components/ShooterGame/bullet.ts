import React, { useEffect, useState } from "react"
import Vector from "victor"
import { UpdateFunction } from "./game"
import { Spaceship } from "./spaceships"
import { TargetManager } from "./target"

const SPEED = 20

export type BulletManager = {
    requestBullet: (args: {
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
    update: UpdateFunction
}

export type Bullet = {
    element: HTMLDivElement,
    pos: Vector,
    vel: Vector,
    dir: Vector,
    pierce: number,
    damage: number
}

export function useBulletManager({
    spaceship,
    spriteRef,
    targetManager
}: {
    spaceship: Spaceship,
    spriteRef: React.RefObject<HTMLImageElement>,
    targetManager?: TargetManager
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
            element.style.height = "10px"
            element.style.position = "absolute"
            element.style.top = "0"
            element.style.backgroundColor = spaceship.bullet.color
            return element
        }

        const createBullet = ({ origin, pos, dir, vel }: {
            origin: Vector,
            pos: Vector,
            dir: Vector,
            vel: Vector
        }): Bullet | undefined => {
            if (!sprite) return undefined
            const spritePos = new Vector(
                sprite.clientWidth,
                sprite.clientHeight
            )
            return {
                pierce: spaceship.bullet.pierce,
                damage: spaceship.bullet.damage,
                element: createElement(),
                pos: new Vector(0, 0)
                    .add(spritePos.clone().multiplyScalar(-0.5))
                    .add(spritePos.clone().multiply(origin))
                    .rotate(dir.angle()-Math.PI/2)
                    .add(pos),
                vel: dir.clone()
                    .rotate(Math.PI)
                    .multiplyScalar(SPEED)
                    .add(vel.clone().rotate(dir.angle()+Math.PI/2)),
                dir: dir.clone()
            }
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
        
        const requestBullet: BulletManager["requestBullet"] = ({
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
            outer:
            for (let i = bullets.length - 1; i >= 0; i--) {
                const { element, pos, vel, dir } = bullets[i]

                pos.add(vel)

                element.style.transform = `
                    translate(${pos.x}px, ${pos.y}px)
                    rotate(${dir.angle()-Math.PI/2}rad)
                `

                if (
                    targetManager?.detect(bullets[i]) &&
                    --bullets[i].pierce <= 0
                ) {
                    removeBullet(i)
                    continue outer
                }

                if (
                    pos.x < 0 || pos.x >= document.body.clientWidth ||
                    pos.y < 0 || pos.y >= document.body.clientHeight
                ) {
                    removeBullet(i)
                    continue
                }
            }
        }

        setBulletManager({
            requestBullet,
            spawn,
            update
        })
    }, [targetManager])

    return bulletManager
}
