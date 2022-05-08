import Vector from "victor"

export type Sprite = {
    url: string
}

export type Spaceship = {
    sprite: Sprite,
    bullet: {
        frequency: number,
        damage: number,
        pierce: number
        color: string,
        length: number
    },
    getBulletOrigins: (i: number) => Vector[]
}

export const spaceships: Spaceship [] = [
    {
        sprite: {
            url: "/x-wing.png"
        },
        bullet: {
            frequency: 16,
            color: "red",
            length: 10,
            damage: 2,
            pierce: 1
        },
        getBulletOrigins: (i) => i % 2 === 0
            ? [new Vector(0.05, 0.5)]
            : [new Vector(0.95, 0.5)]
    },
    {
        sprite: {
            url: "/millennium-falcon.png"
        },
        bullet: {
            frequency: 5,
            color: "red",
            length: 15,
            damage: 2,
            pierce: 2
        },
        getBulletOrigins: () => [
            new Vector(0.47, 0.5),
            new Vector(0.53, 0.5)
        ]
    },
    {
        sprite: {
            url: "/enterprise.png" 
        },
        bullet: {
            frequency: 1,
            color: "#29b6f6",
            length: 30,
            damage: 20,
            pierce: Infinity
        },
        getBulletOrigins: () => [new Vector(0.5, 0)]
    }
]
