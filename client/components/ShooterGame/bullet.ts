import React, { useEffect, useState } from "react"
import Vector from "victor"
import { UpdateFunction } from "./game"
import { Spaceship } from "./spaceships"

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

export function useBulletManager({
    spaceship,
    spriteRef
}: {
    spaceship: Spaceship,
    spriteRef: React.RefObject<HTMLImageElement>
}) {
    const [bulletManager, setBulletManager] = useState<BulletManager>()

    useEffect(() => {
        const sprite = spriteRef.current

        const bullets: {
            element: HTMLDivElement,
            pos: Vector,
            vel: Vector,
            dir: Vector
        }[] = []
        
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

        const spawn: BulletManager["spawn"] = ({ pos, dir, vel }) => {
            if (!sprite) return

            spaceship
                .getBulletOrigins(shootIndex++)
                .forEach((origin) => {
                    const spritePos = new Vector(
                        sprite.clientWidth,
                        sprite.clientHeight
                    )
                    const element = createElement()
                    bullets.push({
                        element,
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
                    })
                    document.body.appendChild(element)
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
            for (let i = bullets.length - 1; i >= 0; i--) {
                const { element, pos, vel, dir } = bullets[i]

                pos.add(vel)

                if (
                    pos.x < 0 || pos.x >= document.body.clientWidth ||
                    pos.y < 0 || pos.y >= document.body.clientHeight
                ) {
                    bullets.splice(i, 1)
                    document.body.removeChild(element)
                    continue
                }

                element.style.transform = `
                    translate(${pos.x}px, ${pos.y}px)
                    rotate(${dir.angle()-Math.PI/2}rad)
                `
            }
        }
        
        setBulletManager({
            requestBullet,
            spawn,
            update
        })
    }, [])

    return bulletManager
}
