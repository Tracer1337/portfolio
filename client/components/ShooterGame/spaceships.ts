export type Sprite = {
    url: string
}

export type Spaceship = {
    sprite: Sprite,
    getBulletOrigin: (i: number) => {
        x: number,
        y: number
    }
}

export const spaceships: Spaceship [] = [
    {
        sprite: {
            url: "/x-wing.png"
        },
        getBulletOrigin: () => ({
            x: 0,
            y: 0
        })
    },
    {
        sprite: {
            url: "/millennium-falcon.png"
        },
        getBulletOrigin: () => ({
            x: 0,
            y: 0
        })
    },
    {
        sprite: {
            url: "/enterprise.png" 
        },
        getBulletOrigin: () => ({
            x: 0,
            y: 0
        })
    }
]
