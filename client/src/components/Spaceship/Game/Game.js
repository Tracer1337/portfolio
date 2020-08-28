import Vector2d from "./Vector2d.js"
import Player from "./Player.js"
import Bullet from "./Bullet.js"

const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40
const SPACE_BAR = 32

const MOVEMENT_FORCE = .007
const ROTATION_FORCE = Math.PI / 550
const BULLET_VELOCITY = 1.5

const SHOOTING_THROTTLE_DURATION = 1000 / 10

function isOutOfScreen({ value: [x, y] }, [width, height]) {
    const directions = []

    if (x < 0 || x + width > window.innerWidth) {
        directions.push("x")
    }

    if (y < 0 || y + height > document.body.scrollHeight) {
        directions.push("y")
    }

    return directions.length ? directions : false
}

class Game {
    constructor(args) {
        this.onPlayerChange = args.onPlayerChange
        this.onBulletChange = args.onBulletChange
        this.onBulletRemove = args.onBulletRemove

        this.player = new Player()
        this.bullets = []

        this.update = this.update.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)

        this.upArrowPressed = false
        this.leftArrowPressed = false
        this.rightArrowPressed = false
        this.spacePressed = false

        this.shootingThrottledUntil = null
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

    handleMovement(deltaTime) {
        if (this.upArrowPressed) {
            const force = new Vector2d([0, MOVEMENT_FORCE]).rotate(this.player.acceleration.getAngle())
            this.player.acceleration = force
        }

        if (this.leftArrowPressed) {
            this.player.acceleration.rotate(-ROTATION_FORCE * deltaTime)
            this.player.velocity.rotate(-ROTATION_FORCE * deltaTime)
        }

        if (this.rightArrowPressed) {
            this.player.acceleration.rotate(ROTATION_FORCE * deltaTime)
            this.player.velocity.rotate(ROTATION_FORCE * deltaTime)
        }
    }

    handleShoot() {
        if (!this.spacePressed || (this.shootingThrottledUntil && this.shootingThrottledUntil > performance.now())) {
            return
        }

        this.shootingThrottledUntil = performance.now() + SHOOTING_THROTTLE_DURATION

        const angle = this.player.velocity.getAngle()

        const position = this.player.position.clone().add(new Vector2d([0, 20]).rotate(angle))
        const velocity = new Vector2d([0, BULLET_VELOCITY]).rotate(angle)

        const bullet = new Bullet({
            position,
            velocity,
            onDestroy: () => {
                const index = this.bullets.findIndex(({ id }) => bullet.id === id)
                this.removeBullet(index, bullet)
            }
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

        this.handleMovement(deltaTime)
        this.handleShoot()

        this.player.update(deltaTime)
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

export { isOutOfScreen }

export default Game