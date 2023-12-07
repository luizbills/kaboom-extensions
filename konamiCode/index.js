/**
 * Plugin to detect Konami Code in kaboom.js games
 *
 * UP UP DOWN DOWN LEFT RIGHT LEFT RIGHT B A
 *
 * @author Luiz Bills
 * @version 0.1
 */
export default function konamiCodePlugin(k) {
    const konamiCode = 'uuddlrlrba'
    let lastInput = 0
    let input = ''
    let actions = []
    let loop = null
    let event = null

    function on(action) {
        actions.push(action)
        if (!event && actions.length > 0) {
            event = k.onKeyPress((key) => {
                lastInput = k.time()
                input += key[0]
                if (input.endsWith(konamiCode)) {
                    input = ''
                    for (const f of actions) f()
                }
            })
            loop = k.loop(1, () => {
                if (input && k.time() - lastInput > 1) {
                    input = ''
                }
            })
        }
    }

    function off(action) {
        actions = actions.filter((f) => f !== action)
        if (0 === actions.length && event) {
            event.cancel()
            loop.cancel()
            loop = event = null
        }
    }

    return {
        onKonamiCode(action) {
            on(action)
            return {
                cancel: () => off(action),
            }
        },
    }
}
