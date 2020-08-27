import Vector2d from "./Vector2d.js"

class Bullet {
    static idCounter = 0

    constructor({ position, velocity }) {
        this.onDestroy = () => {}

        this.position = position
        this.velocity = velocity
        this.id = Bullet.idCounter++
        this.dimensions = [2, 20]
    }

    setOnDestroy(fn) {
        this.onDestroy = fn        
    }

    destroy() {
        this.onDestroy()
    }

    update(deltaTime) {
        this.position.add(this.velocity.clone().mult(deltaTime))
    }
}

export default Bullet