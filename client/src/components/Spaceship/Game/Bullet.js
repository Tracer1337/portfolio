class Bullet {
    static idCounter = 0

    constructor(args) {
        this.onDestroy = args.onDestroy

        this.position = args.position
        this.velocity = args.velocity
        this.id = Bullet.idCounter++
        this.dimensions = [2, 20]
    }

    destroy() {
        this.onDestroy()
    }

    update(deltaTime) {
        this.position.add(this.velocity.clone().mult(deltaTime))
    }
}

export default Bullet