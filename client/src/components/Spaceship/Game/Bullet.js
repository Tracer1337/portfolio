import Vector2d from "./Vector2d.js"

class Bullet {
    static idCounter = 0

    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.id = Bullet.idCounter++
        this.dimensions = [2, 20]
    }

    update(deltaTime) {
        this.position.add(this.velocity)
    }
}

export default Bullet