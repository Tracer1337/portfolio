import React, { useEffect, useState } from "react"
import Vector from "victor"
import { UpdateFunction } from "./game"
import { Spaceship } from "./spaceships"

const SPEED = 10

export type BulletManager = {
    requestBullet: (args: {
        currentTime: number,
        pos: Vector,
        dir: Vector
    }) => void,
    spawn: (args: {
        pos: Vector,
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
            element.style.height = "8px"
            element.style.position = "absolute"
            element.style.top = "0"
            element.style.backgroundColor = spaceship.bullet.color
            return element
        }

        const spawn: BulletManager["spawn"] = ({ pos, dir }) => {
            if (!sprite) return

            spaceship
                .getBulletOrigins(shootIndex++)
                .forEach((origin) => {
                    const spritePos = new Vector(
                        sprite.clientWidth,
                        sprite.clientHeight
                    )
                    const bulletPos = new Vector(0, 0)
                        .add(spritePos.clone().multiplyScalar(-0.5))
                        .add(spritePos.clone().multiply(origin))
                        .rotate(dir.angle()-Math.PI/2)
                        .add(pos)
                    const element = createElement()
                    bullets.push({
                        element,
                        pos: bulletPos,
                        vel: dir.clone().multiplyScalar(-SPEED),
                        dir: dir.clone()
                    })
                    document.body.appendChild(element)
                })
        }
        
        const requestBullet: BulletManager["requestBullet"] = ({
            currentTime,
            pos,
            dir
        }) => {
            if (
                !lastShotTime ||
                currentTime - lastShotTime >= 1000 / spaceship.bullet.frequency
            ) {
                lastShotTime = currentTime
                spawn({ pos, dir })
            }
        }

        const update: UpdateFunction = ({ deltaTime }) => {
            bullets.forEach(({ element, pos, vel, dir }) => {
                pos.add(vel)
                element.style.transform = `
                    translate(${pos.x}px, ${pos.y}px)
                    rotate(${dir.angle()-Math.PI/2}rad)
                `
            })
        }
        
        setBulletManager({
            requestBullet,
            spawn,
            update
        })
    }, [])

    return bulletManager
}
