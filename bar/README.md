# bar(progress = 100, opts = {})

## Usage

```js
kaboom({ plugins: [componentBar] })

const hp = add([
    pos(20),
    bar(50, {
        width: 300,
        fgColor: rgb('265c42'),
        bgColor: rgb('181425'),
        animColor: rgb('e43b44'),
        borderRadius: 0,
        // other options
        // height: default is (this.width / 8)
        // animate: default is true
        // borderWidth: default is (this.height / 4)
    }),
])

onKeyPress('enter', () => {
    hp.addProgress(10)
})

onKeyPress('backspace', () => {
    hp.addProgress(-10)
})
```
