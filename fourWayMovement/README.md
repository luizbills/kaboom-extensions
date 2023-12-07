# fourWayMovement(speed = 100, { arrows = true, keyboard = 'wasd' })

## Usage

```js
// Example 1: Move a sprite with arrow keys, keyboard or gamepad
kaboom({
	plugins: [fourWayMovementComponent]
})

loadBean();

const bean = add([
	pos(center()),
	sprite('bean'),
	fourWayMovement(200)
])

// enable movement using gamepad
onGamepadConnect((gamepad) => {
	bean.setGamepad(gamepad)
})
```

```js
// Example 2: Two players
kaboom({
	plugins: [fourWayMovementComponent]
})

loadBean();
loadSprite('mark', '/sprites/mark.png')

// player 1 uses WASD
const p1 = add([
	pos(center()),
	sprite('bean'),
	fourWayMovement(200, { arrows: false })
])

// player 2 uses arrow keys
const p2 = add([
	pos(center().add(100, 0)),
	sprite('bean'),
	fourWayMovement(200, { keyboard: false })
])
```

```js
// Example 3: Custom keyboard keys (rather than WASD)
kaboom({
	plugins: [fourWayMovementComponent]
})

loadBean();

const bean = add([
	pos(center()),
	sprite('bean'),
    // i = UP, j = LEFT, k = DOWN, l = RIGHT
	fourWayMovement(200, { keyboard: 'ijkl' })
])
```