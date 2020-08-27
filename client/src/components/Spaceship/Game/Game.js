import Player from "./Player.js"
import Vector2d from "./Vector2d.js"

const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39

class Game {
    constructor() {
        this.onPlayerChange = () => {}
        this.player = new Player()
        this.movementForce = new Vector2d([0, .07])
        this.rotationForce = Math.PI / 24

        this.update = this.update.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)

        this.upArrowPressed = false
        this.downArrowPressed = false
        this.leftArrowPressed = false
        this.rightArrowPressed = false
    }

    setOnPlayerChange(fn) {
        this.onPlayerChange = fn
    }

    handleKeyDown(event) {
        if ([LEFT_ARROW, UP_ARROW, RIGHT_ARROW].includes(event.keyCode)) {
            event.preventDefault()
        }

        if (event.keyCode === UP_ARROW) {
            this.upArrowPressed = true
        } else if (event.keyCode === LEFT_ARROW) {
            this.leftArrowPressed = true
        } else if (event.keyCode === RIGHT_ARROW) {
            this.rightArrowPressed = true
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === UP_ARROW) {
            this.upArrowPressed = false
        } else if (event.keyCode === LEFT_ARROW) {
            this.leftArrowPressed = false
        } else if (event.keyCode === RIGHT_ARROW) {
            this.rightArrowPressed = false
        }
    }

    handleMovement() {
        if (this.upArrowPressed) {
            const force = this.movementForce.clone().rotate(this.player.acceleration.getAngle())
            this.player.acceleration.add(force)
        }

        if (this.leftArrowPressed) {
            this.player.acceleration.rotate(-this.rotationForce)
            this.player.velocity.rotate(-this.rotationForce)
        }

        if (this.rightArrowPressed) {
            this.player.acceleration.rotate(this.rotationForce)
            this.player.velocity.rotate(this.rotationForce)
        }
    }

    start() {
        this.lastTime = performance.now()
        this.shouldTerminate = false

        window.addEventListener("keydown", this.handleKeyDown)

        window.addEventListener("keyup", this.handleKeyUp)

        this.update()
    }

    update() {
        const currentTime = performance.now()
        const deltaTime = currentTime - this.lastTime
        this.lastTime = currentTime

        this.handleMovement()

        this.player.update(deltaTime)
        this.onPlayerChange(this.player)

        if (!this.shouldTerminate) {
            requestAnimationFrame(this.update)
        }
    }

    destroy() {
        this.shouldTerminate = true
        window.removeEventListener("keydown", this.handleKeyDown)
        window.removeEventListener("keyup", this.handleKeyUp)
    }
}

export default Game