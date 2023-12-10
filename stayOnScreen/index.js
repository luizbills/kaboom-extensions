/**
 * `stayOnScreen()` component for Kaboom.js
 *
 * Important note: This component must always be the last component from the list.
 *
 * @author Luiz Bills
 * @version 0.1
 */
export default function componentStayOnScreen(k) {
    const stayOnScreen = () => {
        return {
            id: 'stayOnScreen',
            require: ['pos'],
            update() {
                this.pos.x = k.clamp(this.pos.x, 0, k.width() - ~~this.width)
                this.pos.y = k.clamp(this.pos.y, 0, k.height() - ~~this.height)
            },
        }
    }
    return { stayOnScreen }
}
