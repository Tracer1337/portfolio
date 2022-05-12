import { useEffect, useState } from "react"
import Vector from "victor"

export type Wall = {
    a: Vector,
    b: Vector
}

export type Intersection = {
    wall: Wall,
    point: Vector,
    dist: number
}

export type Raycaster = {
    setWalls: (walls: Wall[]) => void,
    cast: (pos: Vector, dir: Vector) => Intersection[]
}

export function useRaycaster() {
    const [raycaster, setRaycaster] = useState<Raycaster>()

    useEffect(() => {
        let walls: Wall[] = []

        const setWalls: Raycaster["setWalls"] = (value) => {
            walls = value
        }

        const findIntersection = (wall: Wall, pos: Vector, dir: Vector) => {
            const x1 = wall.a.x
            const y1 = wall.a.y
            const x2 = wall.b.x
            const y2 = wall.b.y

            const x3 = pos.x
            const y3 = pos.y
            const x4 = pos.x + dir.x
            const y4 = pos.y + dir.y

            const d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
            if (d === 0) {
                return
            }

            const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d
            const u = ((x1 - x3) * (y1 - y2) - (y1 - y3) * (x1 - x2)) / d

            if (t >= 0 && t <= 1 && u <= 0) {
                return {
                    point: new Vector(x1 + t * (x2 - x1), y1 + t * (y2 - y1)),
                    dist: Math.abs(u)
                }
            }

            return
        }

        const cast: Raycaster["cast"] = (pos, dir) => {
            const intersections: Intersection[] = []

            walls.forEach((wall) => {
                const intersection = findIntersection(wall, pos, dir)
                if (intersection) {
                    intersections.push({ ...intersection, wall })
                }
                return intersections
            })

            intersections.sort((a, b) => a.dist - b.dist)

            return intersections
        }

        setRaycaster({ cast, setWalls })
    }, [])

    return raycaster
}
