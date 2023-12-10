/**
 * `bar()` component for Kaboom.js to track HP, MP, XP, loading, etc
 *
 * @author Luiz Bills
 * @version 0.1
 */
export default function componentBar(k) {
    const ZERO = k.vec2()
    function bar(cur = 100, opts = {}) {
        const _width = opts.width ?? 100
        const _height = opts.height ?? _width / 8
        const _animate = opts.animate ?? true
        const _borderWidth = opts.borderWidth ?? _height / 4
        const _borderRadius = opts.borderRadius ?? _width * 0.5
        const _colors = {
            bgColor: opts.bgColor ?? k.BLACK,
            fgColor: opts.fgColor ?? k.WHITE,
            borderColor: opts.borderColor ?? opts.bgColor,
            animColor: opts.animColor ?? rgb('CACACA'),
        }

        let _cur = 0
        let _max = opts.max ?? 100
        let diff = 0

        return {
            id: 'bar',
            require: ['pos'],

            get progress() {
                return _cur
            },

            set progress(value) {
                const prev = _cur
                _cur = Math.max(value, 0)
                _cur = Math.min(_cur, _max)

                if (prev === _cur) return

                if (_animate && prev > _cur) {
                    diff -= ((prev - _cur) / _max) * _width
                } else {
                    diff = 0
                }
            },

            get maxProgress() {
                return _max
            },

            get isBarFull() {
                return _cur === _max
            },

            get isBarEmpty() {
                return _cur === 0
            },

            setBarColor(type, value) {
                _colors[type] = value
            },

            addProgress(value) {
                this.progress = _cur + value
            },

            setMaxProgress(value) {
                _max = Math.max(value, 0)
            },

            get width() {
                return _width
            },

            get height() {
                return _height
            },

            add() {
                this.progress = cur
            },

            draw() {
                const progressWidth = (_width * _cur) / _max
                const radius = ~~_borderRadius || 0

                // border
                if (_borderWidth > 0) {
                    k.drawRect({
                        width: _width + _borderWidth * 2,
                        height: _height + _borderWidth * 2,
                        pos: k.vec2(_borderWidth * -1),
                        color: _colors.borderColor,
                        radius,
                    })
                }

                // background
                k.drawRect({
                    width: _width,
                    height: _height,
                    pos: ZERO,
                    color: _colors.bgColor,
                    radius,
                })

                // animation
                if (_animate && diff < 0) {
                    k.drawRect({
                        width: progressWidth - diff,
                        height: _height,
                        pos: ZERO,
                        color: _colors.animColor,
                        radius,
                    })
                    diff = k.lerp(diff, 0, 0.05)
                    let min = _width * (radius ? 0.05 : 0.02)
                    if (progressWidth - diff < min) {
                        diff = 0
                    }
                }

                // bar
                k.drawRect({
                    width: progressWidth,
                    height: _height,
                    pos: ZERO,
                    color: _colors.fgColor,
                    radius,
                })
            },
        }
    }
    return { bar }
}
