import Vector from "victor"

export type Sprite = {
    url: string
}

export type Spaceship = {
    sprite: Sprite,
    bullet: {
        frequency: number,
        color: string,
        damage: number,
        pierce: number
    },
    getBulletOrigins: (i: number) => Vector[]
}

export const spaceships: Spaceship [] = [
    {
        sprite: {
            url: "/x-wing.png"
        },
        bullet: {
            frequency: 10,
            color: "red",
            damage: 1,
            pierce: 1
        },
        getBulletOrigins: () => [
            new Vector(0, 0.5),
            new Vector(1, 0.5)
        ]
    },
    {
        sprite: {
            url: "/millennium-falcon.png"
        },
        bullet: {
            frequency: 5,
            color: "red",
            damage: 1,
            pierce: 1
        },
        getBulletOrigins: () => [new Vector(0, 0)]
    },
    {
        sprite: {
            url: "/enterprise.png" 
        },
        bullet: {
            frequency: 2,
            color: "blue",
            damage: 10,
            pierce: Infinity
        },
        getBulletOrigins: () => [new Vector(0, 0)]
    }
]
