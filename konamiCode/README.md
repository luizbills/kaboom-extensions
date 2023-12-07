# Konami Code plugin

## Usage

```js
kaboom({
    plugins: [ konamiCodePlugin ],
})

const konami = onKonamiCode(() => {
    debug.log('WOW KONAMI CODE!')
    konami.cancel() // optional: remove to listen just once
})
```
