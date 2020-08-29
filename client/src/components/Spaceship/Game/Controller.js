import Vector2d from "./Vector2d.js"

const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const SPACE_BAR = 32

const SHOOTING_THROTTLE_DURATION = 1000 / 10

const DIRECTIONS = {
    UP: "up",
    RIGHT: "right",
    LEFT: "left"
}

class Controller {
    constructor(props) {
        this.player = props.player
        this.touchEvents = props.touchEvents

        this.onMovement = props.onMovement
        this.onSetAngle = props.onSetAngle
        this.onRotation = props.onRotation
        this.onShoot = props.onShoot

        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleThumbMove = this.handleThumbMove.bind(this)
        this.handleShootStart = this.handleShootStart.bind(this)
        this.handleShootEnd = this.handleShootEnd.bind(this)

        this.upArrowPressed = false
        this.leftArrowPressed = false
        this.rightArrowPressed = false
        this.spacePressed = false

        this.shootingThrottledUntil = null

        this.movementFactor = 1

        this.init()
    }

    init() {
        window.addEventListener("keydown", this.handleKeyDown)
        window.addEventListener("keyup", this.handleKeyUp)

        if (this.touchEvents) {
            this.touchEvents.addEventListener("thumbMove", this.handleThumbMove)
            this.touchEvents.addEventListener("shootStart", this.handleShootStart)
            this.touchEvents.addEventListener("shootEnd", this.handleShootEnd)
        }
    }
    
    destroy() {
        window.removeEventListener("keydown", this.handleKeyDown)
        window.removeEventListener("keyup", this.handleKeyUp)

        if (this.touchEvents) {
            this.touchEvents.removeEventListener("thumbMove", this.handleThumbMove)
            this.touchEvents.removeEventListener("shootStart", this.handleShootStart)
            this.touchEvents.removeEventListener("shootEnd", this.handleShootEnd)
        }
    }

    update() {
        this.handleMovement()
        this.handleShoot()
    }

    handleMovement() {
        if (this.upArrowPressed) {
            this.onMovement(DIRECTIONS.UP, this.movementFactor)
        }

        if (this.leftArrowPressed) {
            this.onMovement(DIRECTIONS.LEFT)
        }

        if (this.rightArrowPressed) {
            this.onMovement(DIRECTIONS.RIGHT)
        }
    }

    handleShoot() {
        if (!this.spacePressed || (this.shootingThrottledUntil && this.shootingThrottledUntil > performance.now())) {
            return
        }

        this.shootingThrottledUntil = performance.now() + SHOOTING_THROTTLE_DURATION

        this.onShoot()
    }

    handleKeyDown(event) {
        this.movementFactor = 1

        if ([LEFT_ARROW, UP_ARROW, RIGHT_ARROW, DOWN_ARROW, SPACE_BAR].includes(event.keyCode)) {
            event.preventDefault()
        }

        if (event.keyCode === UP_ARROW) {
            this.upArrowPressed = true
        } else if (event.keyCode === LEFT_ARROW) {
            this.leftArrowPressed = true
        } else if (event.keyCode === RIGHT_ARROW) {
            this.rightArrowPressed = true
        } else if (event.keyCode === SPACE_BAR) {
            this.spacePressed = true
        }
    }

    handleKeyUp(event) {
        if (event.keyCode === UP_ARROW) {
            this.upArrowPressed = false
        } else if (event.keyCode === LEFT_ARROW) {
            this.leftArrowPressed = false
        } else if (event.keyCode === RIGHT_ARROW) {
            this.rightArrowPressed = false
        } else if (event.keyCode === SPACE_BAR) {
            this.spacePressed = false
            this.shootingThrottledUntil = null
        }
    }

    handleThumbMove(event) {
        const position = new Vector2d([event.detail.x, event.detail.y])
        
        
        if (position.abs() > 0) {
            const angle = position.getAngle()
            
            this.onSetAngle(angle)
            
            this.upArrowPressed = true
            this.movementFactor = position.abs()
        } else {
            this.upArrowPressed = false
        }
    }

    handleShootStart() {
        this.spacePressed = true
    }

    handleShootEnd() {
        this.spacePressed = false
    }
}

export { DIRECTIONS }

export default Controller