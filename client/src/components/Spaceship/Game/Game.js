import Vector2d from "./Vector2d.js"
import Player from "./Player.js"
import Bullet from "./Bullet.js"
import Controller, { DIRECTIONS } from "./Controller.js"

const MOVEMENT_FORCE = .007
const ROTATION_FORCE = Math.PI / 550
const BULLET_VELOCITY = 1.5

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
        this.controller = new Controller({
            player: this.player,
            touchEvents: args.touchEvents,
            onMovement: this.handleMovement.bind(this),
            onSetAngle: this.handleSetAngle.bind(this),
            onShoot: this.handleShoot.bind(this)
        })

        this.bullets = []

        this.update = this.update.bind(this)
    }

    handleMovement(direction, factor = 1) {
        if (direction === DIRECTIONS.UP) {
            this.handleAcceleration(MOVEMENT_FORCE * factor)
        }

        if (direction === DIRECTIONS.LEFT) {
            this.handleRotation(-ROTATION_FORCE * this.deltaTime)
        }
        
        if (direction === DIRECTIONS.RIGHT) {
            this.handleRotation(ROTATION_FORCE * this.deltaTime)
        }
    }

    handleSetAngle(angle) {
        const currentAngle = this.player.velocity.getAngle()
        const deltaAngle = angle - currentAngle
        this.handleRotation(deltaAngle)
    }

    handleRotation(angle) {
        this.player.acceleration.rotate(angle)
        this.player.velocity.rotate(angle)
    }

    handleAcceleration(movementForce) {
        const force = new Vector2d([0, movementForce]).rotate(this.player.acceleration.getAngle())
        this.player.acceleration = force
    }

    handleShoot() {
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
        this.deltaTime = 0

        this.shouldTerminate = false

        this.update()
    }

    update() {
        const currentTime = performance.now()
        this.deltaTime = currentTime - this.lastTime
        this.lastTime = currentTime

        this.controller.update()

        this.player.update(this.deltaTime)
        this.onPlayerChange(this.player)

        for (let i = 0; i < this.bullets.length; i++) {
            const bullet = this.bullets[i]

            bullet.update(this.deltaTime)
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
        this.controls.destroy()
    }
}

export { isOutOfScreen }

export default Game