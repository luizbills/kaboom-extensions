# XP(currentLevel = 1, opts = {})

## Usage

```js
kaboom({
    plugins: [componentXP],
});

loadBean();

const player = add([
    sprite('bean'),
    pos(center()),
    scale(),
    color(),
    XP(),
]);

// press "space" to give 10 XP to bean
onKeyPress('space', () => {
    player.addXP(10);
});

// press "enter" make bean level up 5 times in row
onKeyPress('enter', () => {
    player.levelUp(5);
});

// press "space" to reduce 10 XP from bean
onKeyPress('backspace', () => {
    player.addXP(-10);
});

// triggers every time the player receive (or lost) XP
// if amount < 0 then the player lost XP
player.onXP((amount) => {
    // do something... e.g: update a XP progress bar
});

// triggers every time the player level up
player.onLevelUp((lvl) => {
    // do something... e.g: increase the player stats
});
```

## Properties and methods

- `.level` (read-only) returns the current level.
- `.XP` (read-only) returns the current amount of XP
- `.requiredXP` (read-only) returns the amount necessary to level up
- `.addXP(n: number)` adds/reduces `n` XP
- `.levelUp(n: number)` level up `n` times
- `.onXP(action: (xp: number) => void)` trigger the `action` when the amount of XP changes
- `.onLevelUp(action: (currentLevel: number) => void)` trigger the `action` when level up

## Options

### `opts.formula`

By default, the formula to define how much XP is required to level is `(currentLevel) => currentLevel * 10`.

| Level | XP to level up |
| --- | --- |
| 1 | 10 |
| 2 | 20 |
| 3 | 30 |
| 4 | 40 |

... and so on.

### `opts.curXP`

The initial amount the object has when this component is added.

```js
// the code below will create the player on level 1
// and give 100 XP... Then, the player will level up 3 times.
// tip: enable the `debug.inspect` (press F1) and hover the player sprite
add([
    pos(center()),
    area(),
    sprite('player'),
    XP(1, { curXP: 100 })
])
```

This option is useful for when you need to save your game state. You will only need to save the current level (`player.level`) and your amount of XP (`player.XP`).