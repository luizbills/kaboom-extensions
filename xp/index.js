export default function componentXP(k) {
    function XP(currentLevel = 1, opts = {}) {
        // XP required to level up
        const formula = opts.formula || ((lvl) => 10 * lvl);
        let _curXP = 0;
        let _requiredXP = formula(currentLevel);

        return {
            id: 'XP',

            get level() {
                return currentLevel;
            },

            get XP() {
                return _curXP;
            },

            get requiredXP() {
                return _requiredXP;
            },

            addXP(value) {
                _curXP = Math.max(0, _curXP + value);
                this.trigger('XP', value);
                while (_curXP >= _requiredXP) {
                    const diff = _curXP - _requiredXP;
                    this.levelUp();
                    _curXP = diff;
                }
            },

            levelUp(times = 1) {
                _curXP = 0;
                while (times > 0) {
                    currentLevel++;
                    _requiredXP = formula(currentLevel);
                    this.trigger('levelUp', currentLevel);
                    times--;
                }
            },

            onLevelUp(action) {
                return this.on('levelUp', action);
            },

            onXP(action) {
                return this.on('XP', action);
            },

            add() {
                currentLevel = Math.max(~~currentLevel, 1);
                if (currentLevel > 1) {
                    this.levelUp(currentLevel - 1);
                }
                if (opts.curXP > 0) this.addXP(opts.curXP);
            },

            inspect() {
                return `${_curXP}/${_requiredXP} @ Level: ${currentLevel}`;
            },
        };
    }

    // xp() is alias of X()
    return { XP, xp: XP };
}
