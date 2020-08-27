import Vector2d from "./Vector2d.js"

class Player {
    position = new Vector2d([0, .001])
    velocity = new Vector2d([0, .001])
    acceleration = new Vector2d([0, .001])
    drag = .9
    dimensions = [32, 32]

    update(deltaTime) {
        this.position.add(this.velocity)
        this.velocity.add(this.acceleration)

        this.velocity.mult(this.drag)
        this.acceleration.mult(this.drag)
    }
}

export default Player