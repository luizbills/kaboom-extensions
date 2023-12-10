/**
 * Easily setup four way movement in your games
 *
 * @version 0.1
 * @author Luiz Bills
 */
function fourWayMovementComponent(k) {
    function fourWayMovement(
        speed = 100,
        { arrows = true, keyboard = 'wasd' } = {}
    ) {
        const keys = {
            up: [],
            left: [],
            down: [],
            right: [],
        }

        const check = (dir) => {
            let pressed = false

            for (const key of keys[dir]) {
                pressed = k.isKeyDown(key)
                if (pressed) break
            }

            if (!pressed && _gamepad) {
                const stick = _gamepad.getStick('left')
                switch (dir) {
                    case 'up':
                        pressed = stick.y === -1
                        break
                    case 'left':
                        pressed = stick.x === -1
                        break
                    case 'down':
                        pressed = stick.y === 1
                        break
                    case 'right':
                        pressed = stick.x === 1
                        break
                }
            }

            return pressed
        }
        let _gamepad = null

        return {
            id: 'fourWayMovement',
            require: ['pos'],

            movementSpeed: speed,
            movementDir: k.vec2(0, 0),

            setupFourWay({ arrows = true, keyboard = 'wasd' }) {
                for (const dir in keys) {
                    keys[dir].length = 0 // empty array trick
                }

                if (arrows) {
                    keys.up.push('up')
                    keys.left.push('left')
                    keys.down.push('down')
                    keys.right.push('right')
                }

                if (keyboard) {
                    keyboard = keyboard.toLowerCase()
                    keys.up.push(keyboard[0])
                    keys.left.push(keyboard[1])
                    keys.down.push(keyboard[2])
                    keys.right.push(keyboard[3])
                }
            },

            setGamepad(gamepad) {
                _gamepad = gamepad
            },

            add() {
                this.setupFourWay({ arrows, keyboard })
            },

            update() {
                let vx = 0
                let vy = 0
                if (check('up')) {
                    vy -= 1
                }
                if (check('down')) {
                    vy += 1
                }
                if (check('right')) {
                    vx += 1
                }
                if (check('left')) {
                    vx -= 1
                }
                this.movementDir = k.vec2(vx, vy)
                if (!this.movementDir.isZero()) {
                    const vel = this.movementDir
                        .unit()
                        .scale(this.movementSpeed) // unit() to fix diagonal movement
                    this.move(vel)
                }
            },
        }
    }
    return { fourWayMovement }
}
