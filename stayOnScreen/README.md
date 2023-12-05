# stayOnScreen()

## Usage

```js
kaboom({
    background: [0, 0, 0],
    plugins: [ componentStayOnScreen ],
})

add([
    pos(),
    rect(100,100),
    color(RED),
    move(RIGHT, 1000),
    stayOnScreen(), // must always be the last component.
])
```