import Vector2d from "./Vector2d.js"
import { isOutOfScreen } from "./Game.js"

class Player {
    dimensions = [32, 32]
    position = new Vector2d([
        window.innerWidth / 2 - this.dimensions[0] / 2,
        window.innerHeight / 2 - this.dimensions[1] / 2
    ])
    velocity = new Vector2d([0, 5])
    acceleration = new Vector2d([0, .001])
    drag = .993

    update(deltaTime) {
        let velocity = this.velocity.clone().mult(deltaTime)
        const acceleration = this.acceleration.clone().mult(deltaTime)

        const outOfScreenDirections = isOutOfScreen(this.position.clone().add(velocity), this.dimensions)

        if (outOfScreenDirections) {
            if (outOfScreenDirections.includes("x")) {
                velocity.value[0] = 0
            } 
            if (outOfScreenDirections.includes("y")) {
                velocity.value[1] = 0
            }
        }

        this.position.add(velocity)
        this.velocity.add(acceleration)

        const drag = this.drag ** deltaTime

        this.velocity.mult(drag)
        this.acceleration.mult(drag)
    }
}

export default Player