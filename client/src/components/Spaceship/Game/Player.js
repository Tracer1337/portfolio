import Vector2d from "./Vector2d.js"

class Player {
    dimensions = [32, 32]
    position = new Vector2d([
        window.innerWidth / 2 - this.dimensions[0] / 2,
        window.innerHeight / 2 - this.dimensions[1] / 2
    ])
    velocity = new Vector2d([0, .001])
    acceleration = new Vector2d([0, .001])
    drag = .9

    update(deltaTime) {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)

        this.velocity.mult(this.drag)
        this.acceleration.mult(this.drag)
    }
}

export default Player