# flash(interval: float)

## Usage

```js
const k = kaboom()

// Load the component
plug(componentFlash)

// Add a game object
loadBean();

const bean = add([
    sprite('bean'),
    pos(center()),
    flash(), // add the component
]);

// Flashs for 3 seconds
bean.flash(3);
bean.on('flashEnd', () => {
    destroy(bean)
});
```