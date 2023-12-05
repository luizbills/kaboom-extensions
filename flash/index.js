/**
 * `flash()` component for Kaboom.js
 *
 * @author Luiz Bills
 * @version 0.2
 */
export default function componentFlash(k) {
    const flash = (interval = 0.15) => {
        let _loop = null;

        return {
            id: "flash",

            get isFlashing() {
                return _loop !== null;
            },

            flash(duration = Infinity) {
                if (_loop) this.cancelFlash(false);

                const end = time() + duration;

                this.trigger('flashStart');

                _loop = k.loop(interval, () => {
                    if (time() >= end) return this.cancelFlash();
                    this.hidden = !this.hidden;
                })
            },

            cancelFlash(triggerEvent = true) {
                if (!_loop) return;
                _loop.cancel();
                _loop = null;
                this.hidden = false;
                if (triggerEvent) this.trigger('flashEnd');
            }
        }
    }
    return { flash };
}