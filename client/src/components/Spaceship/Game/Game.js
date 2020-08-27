import Vector2d from "./Vector2d.js"
import Player from "./Player.js"
import Bullet from "./Bullet.js"

const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const SPACE_BAR = 32

const MOVEMENT_FORCE = new Vector2d([0, 1])
const ROTATION_FORCE = Math.PI / 24
const BULLET_VELOCITY = new Vector2d([0, 15])

function isOutOfScreen({ value: [x, y] }, [width, height]) {
    return x < 0 || x + width > window.innerWidth || y < 0 || y + height > document.body.scrollHeight
}

class Game {
    constructor() {
        this.onPlayerChange = () => {}
        this.onBulletChange = () => {}
        this.onBulletRemove = () => {}

        this.player = new Player()
        this.movementForce = MOVEMENT_FORCE
        this.rotationForce = ROTATION_FORCE
        this.bullets = []

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

    setOnBulletChange(fn) {
        this.onBulletChange = fn
    }

    setOnBulletRemove(fn) {
        this.onBulletRemove = fn
    }

    handleKeyDown(event) {
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
            this.handleShoot()
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
            // this.player.acceleration.add(force)
            this.player.acceleration = force
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

    handleShoot() {
        const angle = this.player.velocity.getAngle()

        const position = this.player.position.clone().add(new Vector2d([0, 20]).rotate(angle))
        const velocity = BULLET_VELOCITY.clone().rotate(angle)

        const bullet = new Bullet({ position, velocity })

        bullet.setOnDestroy(() => {
            const index = this.bullets.findIndex(({ id }) => bullet.id === id)
            this.removeBullet(index, bullet)
        })

        this.bullets.push(bullet)
    }

    removeBullet(index, bullet) {
        this.bullets.splice(index, 1)
        this.onBulletRemove(bullet)
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

        const lastPosition = this.player.position.clone()
        this.player.update(deltaTime)
        
        if (isOutOfScreen(this.player.position, this.player.dimensions)) {
            this.player.position = lastPosition
        }

        this.onPlayerChange(this.player)

        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i]

            bullet.update(deltaTime)
            this.onBulletChange(bullet)

            if (isOutOfScreen(bullet.position, bullet.dimensions)) {
                this.removeBullet(i, bullet)
            }
        }

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