# fill(color: Color, opacity: float)

## Usage

```js
kaboom({
    plugins: [componentFill],
});

loadBean();

const obj = add([
    sprite("bean"),
    pos(center()),
    fill(RED) // fill with red
]);

// restore after 3 seconds
wait(3, () => obj.fill(null));
```